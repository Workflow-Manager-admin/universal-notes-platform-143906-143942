import React from "react";

/**
 * Sidebar for navigation (future: add categories/tags)
 */
function NotesSidebar() {
  return (
    <nav>
      <div className="nav-link active">
        <span role="img" aria-label="notes">🗒️</span> Notes
      </div>
    </nav>
  );
}

export default NotesSidebar;
