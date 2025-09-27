import { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./feature/auth/context/AuthContext";
import ProtectedRoute from "./feature/auth/routes/ProtectedRoute";
import PublicRoute from "./feature/auth/routes/PublicRoute";
import "./i18n";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

function App() {
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    document.dir = savedLanguage === "fa" ? "rtl" : "ltr";
  }, []);

  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
