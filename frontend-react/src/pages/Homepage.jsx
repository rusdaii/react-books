import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  useDisclosure,
  Stack,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Books from '../components/Books';
import { getAllBooks, editBook, deleteBook } from '../modules/fetch/index';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('Token') ? true : false;

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: openDeleteAlert,
    onClose: closeDeleteAlert,
  } = useDisclosure();
  const disableEditMode = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books.books);
    };
    fetchBooks();
  }, []);

  const handleEditBook = async (editedBookData) => {
    await editBook(selectedBook.id, editedBookData);

    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
    setIsEditMode(false);
    closeModal();
    navigate(0);
  };

  const handleDeleteBook = async () => {
    await deleteBook(selectedBook.id);
    const updatedBooks = await getAllBooks();
    setBooks(updatedBooks);
    setSelectedBook(null);
    closeDeleteAlert();
    closeModal();
    navigate(0);
  };

  return (
    <Stack direction={['column', 'row']} spacing="24px">
      {books && books.length > 0 ? (
        books.map((book) => (
          <div
            key={`${book.id} ${book.title}`}
            onClick={() => {
              setSelectedBook(book);
              openModal();
            }}
            style={{ cursor: 'pointer' }}
          >
            <Books {...book} />
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}

      {selectedBook && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Book Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isEditMode ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const editedBookData = {
                      title: e.target.title.value,
                      author: e.target.author.value,
                      publisher: e.target.publisher.value,
                      year: +e.target.year.value,
                      pages: +e.target.pages.value,
                    };
                    handleEditBook(editedBookData);
                  }}
                >
                  <label>Title:</label>
                  <Input
                    type="text"
                    defaultValue={selectedBook.title}
                    name="title"
                  />
                  <label>Author:</label>
                  <Input
                    type="text"
                    defaultValue={selectedBook.author}
                    name="author"
                  />
                  <label>Publisher:</label>
                  <Input
                    type="text"
                    defaultValue={selectedBook.publisher}
                    name="publisher"
                  />
                  <label>Year:</label>
                  <Input
                    type="text"
                    defaultValue={selectedBook.year}
                    name="year"
                  />
                  <label>Pages:</label>
                  <Input
                    type="text"
                    defaultValue={selectedBook.pages}
                    name="pages"
                  />
                  <Button type="submit" colorScheme="blue" mr={3} my={5}>
                    Save
                  </Button>
                  <Button colorScheme="gray" onClick={disableEditMode} my={5}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <p>Title: {selectedBook.title}</p>
                  <p>Author: {selectedBook.author}</p>
                  <p>Publisher: {selectedBook.publisher}</p>
                  <p>Year: {selectedBook.year}</p>
                  <p>Pages: {selectedBook.pages}</p>
                  {isAuthenticated && (
                    <Button
                      colorScheme="blue"
                      mr={3}
                      my={5}
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit
                    </Button>
                  )}
                  {isAuthenticated && (
                    <Button colorScheme="red" onClick={openDeleteAlert} my={5}>
                      Delete
                    </Button>
                  )}
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {selectedBook && (
        <AlertDialog isOpen={isDeleteAlertOpen} onClose={closeDeleteAlert}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Delete Book</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this book?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleDeleteBook}>
                Delete
              </Button>
              <Button colorScheme="gray" onClick={closeDeleteAlert} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Stack>
  );
}
