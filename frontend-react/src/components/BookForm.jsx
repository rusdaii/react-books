import {
  Button,
  FormControl,
  Image,
  Input,
  useToast,
  Flex,
  Stack,
  InputGroup,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createBook } from '../modules/fetch';
import { FaBookReader } from 'react-icons/fa';

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: 'Error',
        description: 'Please select image',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: 'Success',
        description: 'Book created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

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
        <FaBookReader size={70} bg="teal.500" />
        <Heading color="teal.400">Add New Book</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <InputGroup>
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  defaultValue={bookData?.title}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <InputGroup>
                <Input
                  type="text"
                  name="author"
                  placeholder="Author"
                  required
                  defaultValue={bookData?.author}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <InputGroup>
                <Input
                  type="text"
                  name="publisher"
                  placeholder="Publisher"
                  required
                  defaultValue={bookData?.publisher}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <InputGroup>
                <Input
                  type="number"
                  name="year"
                  placeholder="Year"
                  required
                  defaultValue={bookData?.year}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb={4}>
              <InputGroup>
                <Input
                  type="number"
                  name="pages"
                  placeholder="Pages"
                  required
                  defaultValue={bookData?.pages}
                />
              </InputGroup>
            </FormControl>
            {selectedImage && (
              <Image w={64} src={selectedImage} alt="Selected Image" />
            )}
            {!bookData?.image && (
              <FormControl mb={4}>
                <InputGroup>
                  <Input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                    }}
                  />
                </InputGroup>
              </FormControl>
            )}

            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              {'Create Book'}
            </Button>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
