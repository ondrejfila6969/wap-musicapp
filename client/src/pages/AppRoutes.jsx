import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home/Home";
import SignInPage from "./SignInPage/SignInPage";
import RegisterPage from "./RegisterPage/RegisterPage";

export default function AppRoutes() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}