import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SignInPage from "./SignInPage/SignInPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import Error from "./Error/Error";
import Layout from "../components/Layout/Layout";
import AdminLayout from "../components/Layout/AdminLayout";
import AdminHome from "./Admin/AdminHome";
import ManageUsers from "./Admin/ManageUsers";
import ProfilePage from "./ProfilePage/ProfilePage";
import Settings from "./Settings/Settings";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import SearchResult from "./SearchResult/SearchResult";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="createPlaylist" element={<CreatePlaylist />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<SearchResult />} />
          </Route>
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
             {/*<Route path="/manageUsers" element={<ManageUsers />} /> */}
            <Route path="manageusers" element={<ManageUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
