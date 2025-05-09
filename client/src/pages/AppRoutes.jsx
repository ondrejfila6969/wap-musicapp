import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home/Home";
import SignInPage from "./SignInPage/SignInPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import Admin from "./Admin/Admin";
import Error from "./Error/Error";

export default function AppRoutes() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/*" element={<Error/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}