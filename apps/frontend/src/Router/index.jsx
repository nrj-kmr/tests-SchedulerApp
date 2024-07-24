import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/notFound";
import GetAllUsers from "../components/allUsers";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/users" element = {<GetAllUsers />} />
        <Route path="/dashboard" element = {<Dashboard />} />
        {/*404 Route*/}
        <Route path="*" element = {<NotFound />} />
    </Routes>
)

export default AppRoutes;