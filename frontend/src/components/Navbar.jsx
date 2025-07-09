import React from 'react';
import { Box, Flex, HStack, Link, IconButton, Button, useDisclosure, Stack, useColorMode, Text, useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const NavLink = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.200',
    }}
    href={href}
  >
    {children}
  </Link>
);



const Navbar = () => {
  const {coloMode, toggleColorMode} = useColorMode()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
   <>
    <Box bg={useColorModeValue("gray.100","gray.900")} px={4} >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
       
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
         <Text  
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text' fontWeight="bold" fontSize="xl" cursor='pointer' onClick={()=>navigate('/')}>MyApp</Text>
        <HStack spacing={8} alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </HStack>

        <Button onClick={toggleColorMode}>
          {coloMode === 'light' ? <IoMoon /> : <LuSun size="20"/>}
        </Button>

        <Flex alignItems={'center'}>
          <Button  bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          colorScheme="black" 
          size="sm" ml={4} onClick={()=>navigate('/login')}>
            SignIn/ SignUp
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>

   </>
  );
};

export default Navbar;


//  <Container maxW={'1440px'} bg={useColorMode("gray.900")}>
      
//     <Box bg="gray.100" px={4}>
//       <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//         <Box  bgGradient='linear(to-l, #7928CA, #FF0080)'
//   bgClip='text' fontWeight="bold" fontSize="xl" cursor='pointer' onClick={()=>navigate('/')}>MyApp</Box>
//         <IconButton
//           size={'md'}
//           icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//           aria-label={'Open Menu'}
//           display={{ md: 'none' }}
//           onClick={isOpen ? onClose : onOpen}
//         />
//         <HStack spacing={8} alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
//           {Links.map((link) => (
//             <NavLink key={link.label} href={link.href}>
//               {link.label}
//             </NavLink>
//           ))}
//         </HStack>
//         <Button onClick={toggleColorMode}>
//           {coloMode === 'light' ? <IoMoon /> : <LuSun size="20"/>}
//         </Button>
//         <Flex alignItems={'center'}>
//           <Button  bgGradient='linear(to-l, #7928CA, #FF0080)'
//           bgClip='text'
//           colorScheme="black" 
//           size="sm" ml={4} onClick={()=>navigate('/login')}>
//             SignIn/ SignUp
//           </Button>
//         </Flex>
//       </Flex>

//       {isOpen ? (
//         <Box pb={4} display={{ md: 'none' }}>
//           <Stack as={'nav'} spacing={4}>
//             {Links.map((link) => (
//               <NavLink key={link.label} href={link.href}>
//                 {link.label}
//               </NavLink>
//             ))}
//           </Stack>
//         </Box>
//       ) : null}
//     </Box>
//     </Container>