import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';

function EditPopup({ data, onSave, onClose }) {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    // Make an HTTP PUT request to update the data on the backend
    axios
    .put(`http://localhost:8080/api/auth/projects/${editedData._id}`, editedData)
    .then((response) => {
      console.log(response.data); // Handle success
      onSave(editedData);
      onClose();
    })
    .catch((error) => {
      console.error(error); // Handle error
    });
  
  };

  return (
    <div className="popup">
      <h2>Edit Row</h2>
      <form>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={editedData.projectName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectManagerName">Project Manager Name</label>
          <input
            type="text"
            id="projectManagerName"
            name="projectManagerName"
            value={editedData.projectManagerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="text"
            id="startTime"
            name="startTime"
            value={editedData.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input
            type="text"
            id="endTime"
            name="endTime"
            value={editedData.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="techStack">Tech Stack</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={editedData.techStack}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={editedData.status}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPopup;
