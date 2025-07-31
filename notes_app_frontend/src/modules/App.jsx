import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./auth/AuthProvider";
import NotesProvider from "./notes/NotesProvider";
import ThemeProvider from "./theming/ThemeProvider";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotesLayout from "./notes/NotesLayout";

/**
 * App layout: wraps with theme, auth, and data provider.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={
                <RequireAuth>
                  <NotesLayout />
                </RequireAuth>
              } />
            </Routes>
          </BrowserRouter>
        </NotesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
