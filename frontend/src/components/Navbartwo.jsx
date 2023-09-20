import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Image,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo1 from '../Assets/quotes.png'

function Navbartwo() {
  

  return (
    <>
      <Box  bgGradient='linear(to-r, #6a3093, #a044ff)' p="10px" >
        {/* <Flex h={16} alignItems={'center'} justifyContent={'space-between'}> */}
         
          {/* <HStack spacing={8} alignItems={'center'}> */}
            {/* <Box w="50px"> */}
                <Image w="50px" src={logo1} />
            {/* </Box> */}
           
          {/* </HStack> */}
         
        {/* </Flex> */}

      </Box>

    
    </>
  );
}

export default Navbartwo;
