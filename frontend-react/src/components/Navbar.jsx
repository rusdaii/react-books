import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('Token')) {
      setIsLoggedIn(true);
    }
    setInitialLoad(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box p={3} borderBottom="1px" borderColor="gray.200" w="100%">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="full"
        mx="auto"
      >
        <Link to="/">
          <Box fontSize="xl" fontWeight="bold">
            My App
          </Box>
        </Link>

        <Flex alignItems="center">
          {isLoggedIn && (
            <Link to="/newbook">
              <Button colorScheme="blue">Add New Book</Button>
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <Button variant="ghost" mr={2} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {!initialLoad && (
                <Button
                  variant="ghost"
                  mr={2}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}

          <IconButton
            icon={<SunIcon />}
            variant="ghost"
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
            color={iconColor}
            ml={2}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
