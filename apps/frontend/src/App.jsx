import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Signup, Login } from "./components/index";
import { Home, Dashboard, NotFound } from "./pages";
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App