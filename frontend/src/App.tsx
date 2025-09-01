import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/SignIn";
import SignupPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; 

function App() {
  
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={!isAuthenticated ? <HomePage /> : <Navigate to="/dashboard" />} />
        
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
