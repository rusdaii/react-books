import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  Input,
  Button,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
  chakra,
  InputRightElement,
  Stack,
  Link,
} from '@chakra-ui/react';
import { registerUser } from '../modules/fetch';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: 'Registered',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (e) {
      const error = new Error(e);
      toast({
        title: 'An error occurred.',
        description: error?.message || 'An error occurred. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading mb={4}>Register</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <Box color="red.500" mb={4}>
                {error}
              </Box>
            )}
            <FormControl isRequired id="name" mb={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input type="text" placeholder="Name" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired id="email" mb={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaEnvelope color="gray.300" />}
                />
                <Input type="email" placeholder="Email Address" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired id="password" mb={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired id="confirmPassword" mb={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  Passwords do not match
                </Text>
              )}
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              Register
            </Button>
          </form>
        </Box>
      </Stack>
      <Box>
        Already Have Account?{' '}
        <Link color="teal.500" onClick={() => navigate('/login')}>
          Sign In
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;
