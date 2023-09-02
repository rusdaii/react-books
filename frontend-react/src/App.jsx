import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import NewBookPage from './pages/NewBook';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isAuthenticated = localStorage.getItem('Token') ? true : false;
  console.log(isAuthenticated);
  return (
    <VStack>
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Homepage />} />
          <Route path={'/register'} element={<Register />} />
          <Route
            path="/newbook"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NewBookPage />
              </PrivateRoute>
            }
          />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/newbook'} element={<NewBookPage />} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
