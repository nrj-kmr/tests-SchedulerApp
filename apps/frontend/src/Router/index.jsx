import { Route, Routes } from "react-router-dom";
import Home from "../components/home";
import Login from "../components/login";
import Signup from "../components/signup";
import NotFound from "../components/notFound";
import GetAllUsers from "../components/allUsers";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element = {<Signup />} />
        <Route path="/users" element = {<GetAllUsers />} />
        {/*404 Route*/}
        <Route path="*" element = {<NotFound />} />
    </Routes>
)

export default AppRoutes;