import { Routes, Route } from "react-router-dom";
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
import SearchResult from "./SearchResult/SearchResult";
import CreateAlbum from "./CreateAlbum/CreateAlbum";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import PlaylistView from "./PlaylistView/PlaylistView";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="createAlbum" element={<CreateAlbum />} />
            <Route path="playlist/:id" element={<PlaylistView />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<SearchResult />} />
          </Route>
        </Route>
        <Route path="signin" element={<SignInPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          {/*<Route path="/manageUsers" element={<ManageUsers />} /> */}
          <Route path="manageusers" element={<ManageUsers />} />
        </Route>
      </Routes>
    </>
  );
}
