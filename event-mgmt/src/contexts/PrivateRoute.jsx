import { Navigate, Outlet } from 'react-router-dom';//for navigation
import { useAuth } from './AuthContext';


function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();


  // While authentication state is loading, render nothing or a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-gray-700">Loading authentication...</p>
      </div>
    );
  }


  // If authenticated, render the child routes, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}                        // last endpoint in privateroute
                          //directly to like enroll


export default PrivateRoute;
