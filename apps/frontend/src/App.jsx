import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signup, Login, AdminDashboard, UserDashboard } from "./components/index";
import { Home, Dashboard, NotFound } from "./pages";
import './App.css'
import ErrorBoundary from "./components/ErrorBoundary";


function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App