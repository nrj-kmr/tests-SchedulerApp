import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./Router";
import './App.css'


function App() {

  return (
    <>
      <div className="min-w-full min-h-full">
        <Router>
          <AppRoutes />
        </Router>
      </div>    
    </>
  )
}

export default App