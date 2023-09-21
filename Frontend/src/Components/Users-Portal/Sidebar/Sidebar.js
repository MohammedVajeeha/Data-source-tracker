import React from 'react';
import './Sidebar.css';

function Sidebar({ onCreateClick }) {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button onClick={onCreateClick}>Create Project</button>
        </li>
        {/* Add more sidebar items here */}
      </ul>
    </div>
  );
}

export default Sidebar;
