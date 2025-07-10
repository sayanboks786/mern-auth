import React, { useState, useContext } from 'react';
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
  useToast,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { AppContext } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const navigate = useNavigate();
  const{BackendUri, setIsLoggedin} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
     console.log({ email, password }); // test
  // send data here
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {

        const res = await fetch(`${BackendUri}/api/auth/login`, {
           method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookies/session
        body: JSON.stringify({ email, password })
        });

        const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      setIsLoggedin(true);
      toast({
        title: 'Login successful.',
        description: data.message || "You've been logged in!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to dashboard 
        navigate("/");


      } catch (error) {
          toast({
        title: 'Login failed.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }
      }
     

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      bgGradient='linear(to-l, #7928CA, #FF0080)'
    >
      <Box
         bg={useColorModeValue("gray.50","gray.900")}
        p={8}
        rounded="md"
        shadow="md"
        w={{ base: '90%', sm: '400px' }}
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading size="lg">Login</Heading>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            width="full"
            isLoading={isSubmitting}
          >
            Login
          </Button>
          <Text fontSize="sm" color='blue.500'>
            <Link to="/reset-password">Forgot Password?</Link>
          </Text>
          <Text fontSize="sm" color='blue.500'>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </VStack>

      </Box>
      
    </Box>
  );
};