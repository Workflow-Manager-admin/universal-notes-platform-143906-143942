import React, { useState, useEffect } from "react";

/**
 * Dialog/modal for creating or editing a note.
 * @param {object} props.initial - (optional) note data if editing
 * @param {function} props.onSave
 * @param {function} props.onClose
 * @param {boolean} props.open
 */
function NoteDialog({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [content, setContent] = useState(initial ? initial.content : "");
  const [category, setCategory] = useState(initial ? initial.category : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initial ? initial.title : "");
    setContent(initial ? initial.content : "");
    setCategory(initial ? initial.category : "");
    setError("");
  }, [initial, open]);

  async function handleSave(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    await onSave({
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),
    });
    setSaving(false);
  }

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-box" onClick={e => e.stopPropagation()}>
        <h2>{initial ? "Edit Note" : "New Note"}</h2>
        {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSave}>
          <label>
            Title<br />
            <input value={title} onChange={e => setTitle(e.target.value)} required minLength={1} maxLength={255} />
          </label>
          <label>
            Content<br />
            <textarea rows={5} value={content} onChange={e => setContent(e.target.value)} />
          </label>
          <label>
            Category<br />
            <input value={category} onChange={e => setCategory(e.target.value)} />
          </label>
          <div style={{marginTop:16,display:"flex",gap:10}}>
            <button type="submit" className="primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button onClick={onClose} type="button" style={{background:"#f2f2f2"}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteDialog;
