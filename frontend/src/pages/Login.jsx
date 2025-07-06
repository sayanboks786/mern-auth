import React, { useState } from 'react';
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
  Text
} from '@chakra-ui/react';

export const Login = () => {
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
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate login API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: 'Login successful.',
          description: "You've been logged in!",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }, 1000);
    }
  };

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
        bg="white"
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