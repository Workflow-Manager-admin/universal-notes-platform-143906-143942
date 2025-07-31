import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";

const NotesContext = createContext(null);
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// PUBLIC_INTERFACE
export function useNotes() {
  return useContext(NotesContext);
}

/**
 * Notes provider for fetching, adding, editing, deleting notes.
 * Handles backend interaction and exposes helpful methods for UI.
 */
// PUBLIC_INTERFACE
function NotesProvider({ children }) {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  // Fetch notes from backend
  const fetchNotes = async ({ q="", category="", page=1 } = {}) => {
    setLoading(true);
    setError("");
    let url = `${API_URL}/notes/?page=${page}&per_page=20`;
    if(q) url += `&q=${encodeURIComponent(q)}`;
    if(category) url += `&category=${encodeURIComponent(category)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if(!res.ok) {
      setNotes([]);
      setError("Could not fetch notes.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setNotes(data.items);
    setTotalPages(data.total_pages || 1);
    setLoading(false);
  };

  // Create a new note
  const createNote = async (note) => {
    setLoading(true);
    setError("");
    const res = await fetch(`${API_URL}/notes/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note),
    });
    if(!res.ok) {
      setError("Failed to create note.");
      setLoading(false);
      return false;
    }
    await fetchNotes();
    setLoading(false);
    return true;
  };

  // Edit/update a note
  const updateNote = async (id, note) => {
    setLoading(true);
    setError("");
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note),
    });
    if(!res.ok) {
      setError("Failed to update note.");
      setLoading(false);
      return false;
    }
    await fetchNotes();
    setLoading(false);
    return true;
  };

  // Delete note
  const deleteNote = async (id) => {
    setLoading(true);
    setError("");
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if(!res.ok) {
      setError("Failed to delete note.");
      setLoading(false);
      return false;
    }
    await fetchNotes();
    setLoading(false);
    return true;
  };

  // Search & category
  useEffect(() => {
    if(token) fetchNotes({ q: search, category, page });
    // eslint-disable-next-line
  }, [token, search, category, page]);

  return (
    <NotesContext.Provider value={{
      notes,
      loading,
      error,
      fetchNotes,
      createNote,
      updateNote,
      deleteNote,
      search,
      setSearch,
      category,
      setCategory,
      page,
      setPage,
      totalPages,
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
