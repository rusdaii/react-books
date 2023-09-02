import { Navigate } from 'react-router-dom';

function PrivateRoute({ isAuthenticated, children }) {
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
