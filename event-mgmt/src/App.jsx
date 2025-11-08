import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { AddEvents } from "./pages/dashboard/event/addEvents";
import Viewevents from "./pages/dashboard/event/Viewevents";
import Modifyevent from "./pages/dashboard/event/Modifyevent";
import Eventlistcard from "./pages/Eventlistcard";
import Enroll from "./pages/Enroll";
import { AuthProvider } from "./contexts/AuthContext";
import AppHeader from "./contexts/AppHeader";
import PrivateRoute from "./contexts/privateRoute";
import SessionWarningDialog from "./components/SessionWarningDialog";
import RoleRoute from "./contexts/RoleRoute";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppHeader />
        <SessionWarningDialog />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addEvents" element={<AddEvents />} />

            <Route element={<RoleRoute allowedRoles={['admin']}/>}>
            <Route path="/viewevents" element={<Viewevents />} />
            <Route path="/modifyevent/:id" element={<Modifyevent />} />
            </Route>

            <Route path="/eventlistcard" element={<Eventlistcard />} />
            <Route path="/enroll/:id" element={<Enroll />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
