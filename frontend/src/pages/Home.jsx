import React from 'react'

import { Stack, Text, VStack,HStack, Box } from '@chakra-ui/react'
import { vh } from 'framer-motion'

export const Home = () => {
  return (
    <Box minH="100vh"
    bgGradient='linear(to-l, #7928CA, #FF0080)'>
      
    <Text 
    // bgClip='text'
    fontSize= '42'
    textAlign="center"
    fontWeight="medium"> 
    welcome to our website 
    </Text>
    </Box>
  )
}
