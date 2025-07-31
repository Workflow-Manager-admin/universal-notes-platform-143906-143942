import React from "react";

/**
 * Renders all notes as cards.
 * @param {Object[]} notes
 * @param {boolean} loading
 * @param {function} onEdit
 * @param {function} onDelete
 */
function NoteList({ notes, loading, onEdit, onDelete }) {
  if(loading) return <div>Loading notes...</div>;
  if(!notes || notes.length === 0) return <div>No notes found.</div>;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.3em",
      marginBottom: 30,
    }}>
      {notes.map(note => (
        <div key={note.id}
          style={{
            background: "var(--color-secondary)",
            border: "1.2px solid var(--color-border)",
            borderRadius: 10,
            padding: "1.1em 1.1em 1em 1.3em",
            boxShadow: "0px 2px 10px #4285f412",
            position: "relative"
          }}>
          <div style={{ fontWeight: "bold", fontSize: "1.06em" }}>{note.title}</div>
          {note.category &&
            <span style={{
              fontSize: ".94em",
              color: "var(--color-accent)",
              marginRight: 6,
              display: "block"
            }}>{note.category}</span>
          }
          <div style={{
            fontSize: ".98em",
            margin: "6px 0 11px 0",
            minHeight: "44px",
            whiteSpace:"pre-wrap"
          }}>
            {String(note.content||"")}
          </div>
          <div style={{ fontSize: ".82em", color: "#6D7793" }}>
            Updated: {note.updated_at ? (new Date(note.updated_at)).toLocaleString() : ""}
          </div>
          <div style={{position:"absolute",right:9,top:8,display:"flex",gap:7}}>
            <button title="Edit" onClick={() => onEdit(note)} style={{border:0,background:"none",color: "var(--color-primary)",fontSize:"1.18em",cursor:"pointer"}}>✏️</button>
            <button title="Delete" onClick={() => {
                if(window.confirm("Delete this note?")) onDelete(note.id);
              }} style={{border:0,background:"none",color:"crimson",fontSize:"1.15em",cursor:"pointer"}}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
