import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  FormErrorMessage,
  Text,
  useColorModeValue} from '@chakra-ui/react';
// import { hover } from 'framer-motion';


export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
     console.log({ name, email, password }); // test
  // send data here
  }

  return (
    <Box minH="100vh"
    display = "flex"
    alignItems={"center"}
    justifyContent={"center"}
    bg={"gray.50"}
    bgGradient='linear(to-l, #7928CA, #FF0080)'>
      <Box 
      bg={useColorModeValue("gray.50","gray.900")}
      p={8}
      rounded={"md"}
      shadow={"md"}
      w={{base: '90%', sm: '400px'}}>

        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading size={'lg'}>Create an Account</Heading>
      
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email"  value={email} placeholder="your@email.com" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password"  type= {'password'}
                placeholder="Password"
                 value={password}
                onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">SignUp</Button>

          <Text fontSize="sm" color='blue.500' >
            Already have an account? <Link to="/login">Login</Link>
          </Text>

        </VStack>
      </Box>
    </Box>
  )
}
