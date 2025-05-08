import "./App.css";
import Header from "./components/Header/Header";
import Library from "./components/Library/Library";
import MainContent from "./components/MainContent/MainContent";
import Player from "./components/Player/Player";
import SearchBar from "./components/SearchBar/SearchBar";
import AppRoutes from "./pages/AppRoutes";

export default function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}
