import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {Box,Flex,Heading,Input,Select,Text,IconButton, Textarea} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import {BiSolidSend} from 'react-icons/bi'
// import { color } from 'framer-motion'
import axios from 'axios'

const QuoteDashboard = () => {
    const [genre,setGenre] = useState("")
    const [category,setCategory] = useState("")
    const [result,setResult] = useState("")
    const [typingResult, setTypingResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading,setLoading] = useState(false)
    // console.log(category,genre)
    const handleSend = () => {
        const genreObj = {
            genre
        }
        setLoading(true)
        axios.post(`https://quotewizardbackend.onrender.com/generate/${category}`,genreObj).then((res)=>{
            // console.log(res)
            setLoading(false)
            setShowResult(true);
            setResult(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(() => {
        if (showResult) {
          let currentIndex = 0;
          const intervalId = setInterval(() => {
            if (currentIndex <= result.length) {
              setTypingResult(result.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(intervalId);
            }
          }, 50); // Adjust the typing speed by changing the interval duration
          return () => clearInterval(intervalId);
        }
      }, [showResult, result]);
  return (
    <div>
        <Navbar/>
         
         <Box bgGradient='linear(to-r, #6a3093, #a044ff)' p="10px" minH={"100vh"} overflowY={"auto"}>
            <Heading as="h1" size="xl">QuoteWizard</Heading>
            <Text fontWeight={"bold"}>Joke/Quote/Story/Shayari/Song Generator</Text>

            <Box w="70%" m="20px auto" >
                <Flex justifyContent={"space-around"}>
                <Input h="50px"  type='text' color={"white"} isDisabled={!category} placeholder={category ? `What kind of ${category} you want?` : "Please select the category first"} 
                _placeholder={{color:"white",fontWeight:"500",fontSize:"17px"}} value={genre} onChange={(e)=>setGenre(e.target.value)} />

                    <Select h="50px" ml="40px" mr="10px" value={category} onChange={(e)=>setCategory(e.target.value)} fontSize={"18px"} fontWeight={"500"}>
                        <option value={""}>Select Category</option>
                        <option value={"jokes"}>Joke</option>
                        <option value={"quote"}>Quote</option>
                        <option value={"stories"}>Story</option>
                        <option value={"shayaries"}>Shayari</option>
                        <option value={"songs"}>Song</option>
                    </Select>
                    <IconButton onClick={handleSend} h="50px" w="15%" colorScheme='blue' aria-label='Send' icon={<BiSolidSend style={{fontSize:"25px"}} />}/>
                </Flex> 
            </Box>
            <Box w='60%' bg='#4a1f69' color='white' m='auto'>
          {
            loading ?   <div className="loader" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="loader-inner">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div> :
            
            showResult && (
            <Textarea
            padding={"30px"}
            fontSize={"17px"}
              readOnly={true}
              value={typingResult}
              style={{ resize: 'none', minHeight:"50vh"}}
            />
          )}
        </Box>
         </Box>
    </div>
  )
}

export default QuoteDashboard


// border="1px solid red"