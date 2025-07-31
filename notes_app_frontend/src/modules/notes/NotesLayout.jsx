import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { useTheme } from "../theming/ThemeProvider";
import NotesSidebar from "./NotesSidebar";
import NotesMain from "./NotesMain";

/**
 * The primary dashboard layout for authenticated users.
 * Uses app bar, sidebar, and main notes content.
 */
// PUBLIC_INTERFACE
function NotesLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside className="sidebar">
        <NotesSidebar />
        <div className="sidebar-bottom">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <br />
          <button style={{ marginTop: 8 }} onClick={logout}>Logout</button>
        </div>
      </aside>
      <div style={{flex:1}}>
        <header className="app-bar">
          📝 Universal Notes
          <span style={{ fontWeight: 400, fontSize: ".94em" }}>
            {user ? `Hi, ${user.username!=='None'?user.username:user.email}` : ""}
          </span>
        </header>
        <main className="main-content">
          <NotesMain />
        </main>
      </div>
    </div>
  );
}

export default NotesLayout;
