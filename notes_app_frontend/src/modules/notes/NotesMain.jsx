import React, { useState } from "react";
import { useNotes } from "./NotesProvider";
import NoteList from "./NoteList";
import NoteDialog from "./NoteDialog";

/**
 * Main notes content: search, filters, notes list, create/edit UI
 */
// PUBLIC_INTERFACE
function NotesMain() {
  const {
    notes, loading, error, createNote, updateNote, deleteNote,
    search, setSearch,
    page, setPage, totalPages
  } = useNotes();

  const [editing, setEditing] = useState(null); // note or null
  const [creating, setCreating] = useState(false);

  function handleEdit(note) { setEditing(note); }
  function handleCreate() { setCreating(true); }
  function closeDialogs() { setEditing(null); setCreating(false); }

  // Pagination controls
  function handleNext() {
    if(page < totalPages) setPage(page+1);
  }
  function handlePrev() {
    if(page > 1) setPage(page-1);
  }

  return (
    <>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 32 }}>
        <input
          style={{ flex: "1 1 350px", maxWidth: 380 }}
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="primary" onClick={handleCreate}>+ New Note</button>
      </div>
      {error && <div style={{ color: "crimson", marginBottom: 10 }}>{error}</div>}
      <NoteList notes={notes} loading={loading} onEdit={handleEdit} onDelete={deleteNote} />

      {(creating || editing) &&
        <NoteDialog
          open={!!(creating || editing)}
          onClose={closeDialogs}
          onSave={async (data) => {
            if(creating) {
              await createNote(data);
              setCreating(false);
            } else if(editing) {
              await updateNote(editing.id, data);
              setEditing(null);
            }
          }}
          initial={editing}
        />
      }
      {/* Pagination */}
      {totalPages > 1 &&
        <div style={{marginTop: 18, display:"flex",gap:18,alignItems:"center"}}>
          <button onClick={handlePrev} disabled={page<=1}>
            ◀ Prev
          </button>
          <span style={{fontWeight:"bold"}}>Page {page}/{totalPages}</span>
          <button onClick={handleNext} disabled={page>=totalPages}>
            Next ▶
          </button>
        </div>
      }
    </>
  );
}

export default NotesMain;
