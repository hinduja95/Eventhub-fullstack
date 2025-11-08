import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';


function RoleRoute({ allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();


  // While authentication state is loading, render nothing or a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-gray-700">Checking user roles...</p>
      </div>
    );
  }


  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }


  // If authenticated but user or user.role is missing, redirect to unauthorized
  // This handles cases where the token might be valid but user data is incomplete
  if (!user || !user.data.role || !allowedRoles.includes(user.data.role)) {
    return <Navigate to="/unauthorized" replace />;
  }


  // If authenticated and has the allowed role, render the child routes
  return <Outlet />;
}


export default RoleRoute;