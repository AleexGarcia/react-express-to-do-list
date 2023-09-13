import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { getToken } from "./services/storage";
import { verifyToken } from "./services/authService";
import jwtDecode from "jwt-decode";
import { JwtPayload } from "./interfaces";
import ToDo from "./pages/ToDo";

const MainRoutes = () => {
    const {isLoggedIn, setIsLoggedIn, setUser} = useContext(AppContext);
    const token = getToken();
  
    if(token){
       verifyToken(token).then(res => {
            if(res.status === 200){
                setIsLoggedIn(true);
                const payload = jwtDecode(token) as JwtPayload;
                setUser(payload.name);
            } 
       })
    }

    return (
        <Routes>
            <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to={'/todo'}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todo" element={isLoggedIn ? <ToDo /> : <Navigate to={'/'}/>} />
        </Routes>
    )
}

export default MainRoutes;