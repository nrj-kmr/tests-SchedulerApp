import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signup, Login, AdminDashboard, UserDashboard } from "./components/index";
import { Home, Dashboard, NotFound } from "./pages";
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App