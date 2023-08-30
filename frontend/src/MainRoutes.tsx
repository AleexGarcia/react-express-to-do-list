import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ToDoList from "./pages/ToDoList";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todo" element={<ToDoList />} />
        </Routes>
    )
}

export default MainRoutes;