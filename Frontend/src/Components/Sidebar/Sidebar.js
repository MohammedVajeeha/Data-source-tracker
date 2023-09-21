import React from 'react';

function Sidebar({ onCreateClick }) {
  return (
    <div className="sidebar">
      <button onClick={onCreateClick}>Create</button>
      {/* Navigation links */}
    </div>
  );
}

export default Sidebar;