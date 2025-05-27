import AppRoutes from "./pages/AppRoutes";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import { SettingsProvider } from "./context/SettingsContext";
export default function App() {
  return (
    <>
      <AuthProvider>
        <SettingsProvider>
          <AppRoutes />
        </SettingsProvider>
      </AuthProvider>
    </>
  );
}
