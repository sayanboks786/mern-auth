import { Box, Text, Spinner } from '@chakra-ui/react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

export const Home = () => {
  const { userData, isLoggedin } = useContext(AppContext);
  // console.log("User data set:", userData);
  return (
    <Box minH="100vh" bgGradient="linear(to-l, #7928CA, #FF0080)" display="flex" alignItems="center" justifyContent="center">
      {isLoggedin == true ? (
        userData ? (
          <Box textAlign="center">
            <Text fontSize="4xl" fontWeight="medium" color="white">Hi, {userData.name}!</Text>
            <Text fontSize="2xl" color="white">Welcome to our website!</Text>
          </Box>
        ) : (
          <Spinner color="white" />
        )
      ) : (isLoggedin == false && (
        <Text fontSize="4xl" color="white" textAlign="center">Please log in to see your personalized message.</Text>
      ))}
    </Box>
  );
};

