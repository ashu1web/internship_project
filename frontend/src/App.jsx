import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "./api/Auth";

function AppContent() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

 useEffect(() => {
  const noNavbarRoutes = ["/login", "/signup"];
  if (!isLoading) {
    setShowNavbar(user && !noNavbarRoutes.includes(location.pathname));
  }
}, [location.pathname, user, isLoading]);


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      {showNavbar && <Navbar user={user} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile/:userId"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
