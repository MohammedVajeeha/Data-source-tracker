import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Button } from '@mui/material';
// import 'react-datepicker/dist/react-datepicker.css';
function EditPopup({ data, onSave, onClose }) {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleDateChange = (name, date) => {
    setEditedData({ ...editedData, [name]: date });
  };

  const handleSave = () => {
    // Make an HTTP PUT request to update the data on the backend
    axios
      .put(`http://localhost:8080/api/auth/projects/${editedData._id}`, editedData)
      .then((response) => {
        console.log(response.data); // Handle success
        onSave(editedData); // Notify the parent component that the data was saved
      })
      .catch((error) => {
        console.error(error); // Handle error
      })
      .finally(() => {
        onClose(); // Close the edit popup whether the request succeeds or fails
      });
  };
  

  return (
    <div className="popup" style={{borderRadius:"8px"}}>
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
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px"}} >
        <div className="form-group">
          <label htmlFor="startTime">Start Date</label>
          <DatePicker
            id="startTime"
            selected={new Date(editedData.startTime)}
            onChange={(date) => handleDateChange('startTime', date)}
            dateFormat="MMMM d, yyyy"
            required // Add HTML5 validation for required field
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Date</label>
          <DatePicker
            id="endTime"
            selected={new Date(editedData.endTime)}
            onChange={(date) => handleDateChange('endTime', date)}
            dateFormat="MMMM d, yyyy"
            required // Add HTML5 validation for required field
          />
        </div>
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
          <Button variant='outlined' onClick={onClose}>
            Close
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditPopup;
