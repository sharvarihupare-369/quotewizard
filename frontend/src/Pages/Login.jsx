import { Box, Button, Flex, Input, resolveStyleConfig, useToast,Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbartwo from "../components/Navbartwo";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    // const token = localStorage.getItem("quote-token") || "";
  const toast = useToast()
  const navigate = useNavigate()
  const [loginstatus, setLoginstatus] = useState(false);
  const [loginmsg,setLoginmsg] = useState("");
  const [signupmsg,setSignupmsg] = useState("");
  const [errmsg,setErrmsg] = useState("");
  const [username,setUsername] = useState("");
  const [loading,setLoading] = useState(false);
  const [signupdata, setSignupdata] = useState({
    name : "",
    email: "",
    password: "",
  });
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setLogindata({ ...logindata, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { value, name } = e.target;
    setSignupdata({ ...signupdata, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post("https://quotewizardbackend.onrender.com/users/login",logindata).then((res)=>{
        // console.log(res.data)
        setLoading(false)
        setLoginmsg(res.data.msg)
        localStorage.setItem("quote-token",res.data.token)
    }).catch((err)=>{
        // console.log(err.response.data.errmsg)
        setErrmsg(err.response.data.errmsg)
    })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post("https://quotewizardbackend.onrender.com/users/register",signupdata).then((res)=>{
        console.log(res.data)
        setLoading(false)
        setSignupmsg(res.data.msg)
        
    }).catch((err)=>{
        // console.log(err.response.data.errmsg)
        setErrmsg(err.response.data.errmsg)
    })
  }

  useEffect(()=>{
    if(loginmsg){
         toast({
        title: loginmsg,
        // description: 
        status: 'success',
        duration:4000,
        isClosable: true,
        position:"top"
      })
      setTimeout(()=>{
        navigate("/generator")
      },4000)
      return
        }
    if(errmsg){
        return  toast({
            title: errmsg,
            // description: 
            status: 'error',
            duration:4000,
            isClosable: true,
            position:"top"
          })  
    }
    if(signupmsg){
        return  toast({
         title: signupmsg,
         // description: 
         status: 'success',
         duration:4000,
         isClosable: true,
         position:"top"
       })
     }
  },[loginmsg,errmsg,signupmsg])

  return (
    <>

    {/* <Box     > */}
      <Box bg="#bdc3c7" minH="100vh" >
      <Navbartwo  />

      <Box   w="30%" bg="white" p="30px"  m="100px auto"  boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px">
        <Flex >
          <Button colorScheme={loginstatus ? "blue" : "gray"} onClick={() => setLoginstatus(true)} w="50%">
            Login
          </Button>
          <Button  onClick={() => setLoginstatus(false)} w="50%" colorScheme={loginstatus ? "gray" : "blue"}>
            Signup
          </Button>
        </Flex>

        <Box p="20px" h="50vh">
          {loginstatus ? (
            <form onSubmit={handleLogin}>
            
             
              <Box>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email..."
                  value={logindata.email}
                  onChange={handleChange}
                  variant="flushed"
                />
              </Box>
              <Box mt="10px">
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password..."
                  value={logindata.password}
                  onChange={handleChange}
                  variant="flushed"
                />
              </Box>
              <Button type="submit" mt="10px" w="100%" colorScheme="blue">
                Login
              </Button>
              <Text mt="10px">Not registred yet? <Link >Signup</Link></Text>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
            <Box>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Username..."
                  value={signupdata.name}
                  onChange={handleSignupChange}
                  variant="flushed"
                />
              </Box>
              <Box mt="10px">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email..."
                  value={signupdata.email}
                  onChange={handleSignupChange}
                  variant="flushed"
                />
              </Box>
              <Box mt="10px">
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Password..."
                  value={signupdata.password}
                  onChange={handleSignupChange}
                  variant="flushed"
                />
              </Box>
              <Button type="submit" mt="10px" w="100%" colorScheme="blue">
                Signup
              </Button>
          <Text mt="10px">Already registred? <Link >Login</Link></Text>
            </form>
          )}
        </Box>
      </Box>
      {/* </Box> */}
    </Box>
    </>
  );
};

export default Login;
