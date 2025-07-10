import React, { useState, useContext } from 'react'
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
import { AppContext } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
  


export const Signup = () => {

  const navigate = useNavigate();
  const{BackendUri, setIsLoggedin} = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  
    const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'User Name is required'
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log({ name, email, password }); // test
    
     const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
        try {
          const res = await fetch(`${BackendUri}/api/auth/register`, {
          method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookies/session
        body: JSON.stringify({ name,email, password })
        });

        const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Signup failed');
      }

      setIsLoggedin(true);
      toast({
        title: 'SignUp successful.',
        description: data.message || "Your Account Created Successfully!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to dashboard 
        navigate("/login");
        } catch (error) {
            toast({
        title: 'SignUp failed.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
        }finally {
      setIsSubmitting(false);
    }
    }

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
      
          <FormControl isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type='text' 
            placeholder='Enter your name' 
            value={name} onChange={(e) => setName(e.target.value)} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" 
            value={email} placeholder="your@email.com" onChange={(e) => setEmail(e.target.value)} />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input name="password"  type= {'password'}
                placeholder="Password"
                 value={password}
                onChange={(e) => setPassword(e.target.value)} />
                 <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full" isLoading={isSubmitting}>SignUp</Button>

          <Text fontSize="sm" color='blue.500' >
            Already have an account? <Link to="/login">Login</Link>
          </Text>

        </VStack>
      </Box>
    </Box>
  )
}
