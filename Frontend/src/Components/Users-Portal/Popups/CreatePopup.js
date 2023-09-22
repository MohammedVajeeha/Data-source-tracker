import React, { useState, useEffect } from 'react';
import './Popup.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Button, TextField } from '@mui/material';


function CreatePopup({ onSave, onClose, initialData }) {
  const [newRowData, setNewRowData] = useState(initialData || {
    projectName: '',
    projectManagerName: '',
    startTime: null,
    endTime: null,
    techStack: '',
    status: null,
  });

  useEffect(() => {
    // Update the newRowData state when initialData changes (e.g., when reopening the popup)
    setNewRowData(initialData || {
      projectName: '',
      projectManagerName: '',
      startTime: null,
      endTime: null,
      techStack: '',
      status: null,
    });
  }, [initialData]);

  const statusOptions = [
    { label: 'In Progress', value: 'INPROGRESS' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Pending', value: 'PENDING' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const handleStatusChange = (selectedOption) => {
    setNewRowData({ ...newRowData, status: selectedOption });
  };

  const handleDateChange = (name, date) => {
    setNewRowData({ ...newRowData, [name]: date });
  };

  const handleCreate = () => {
    // Check if all required fields are filled
    if (
      newRowData.projectName &&
      newRowData.projectManagerName &&
      newRowData.status &&
      newRowData.startTime &&
      newRowData.endTime
    ) {
      const startTime = new Date(newRowData.startTime);
      const endTime = new Date(newRowData.endTime);

      // Check if the end date is greater than or equal to the start date
      if (startTime <= endTime) {
        // Prepare the data to send to the backend
        const dataToSend = {
          projectName: newRowData.projectName,
          projectManagerName: newRowData.projectManagerName,
          status: newRowData.status.value, // Use .value to get the selected value from the Select component
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          techStack: newRowData.techStack,
        };

        // Send data to the backend API
        axios
          .post('http://localhost:8080/api/auth/createRow', dataToSend)
          .then((response) => {
            // Handle successful response
            console.log('Data saved successfully:', response.data);
            onSave(newRowData);
            onClose();
          })
          .catch((error) => {
            // Handle error
            console.error('Error while creating data:', error);
            alert('Error while saving data. Please try again later.');
          });
      } else {
        alert('End Date must be greater than or equal to Start Date.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="popup" style={{borderRadius:"8px"}} >
      <h2>Create New Row</h2>
      <form>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <TextField
          fullWidth
          
          size='small'
            type="text"
            id="projectName"
            name="projectName"
            value={newRowData.projectName}
            onChange={handleInputChange}
            required // Add HTML5 validation for required field
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectManagerName">Project Manager Name</label>
          <TextField
          size='small'
          fullWidth

            type="text"
            id="projectManagerName"
            name="projectManagerName"
            value={newRowData.projectManagerName}
            onChange={handleInputChange}
            required // Add HTML5 validation for required field
          />
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px",paddingRight:"10px"}} >
        <div className="form-group">
          <label htmlFor="startTime">Start Date</label>
          <DatePicker
          wrapperClassName="datePicker"
            id="startTime"
            selected={newRowData.startTime}
            onChange={(date) => handleDateChange('startTime', date)}
            dateFormat="MMMM d, yyyy"
            required // Add HTML5 validation for required field
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Date</label>
          <DatePicker
          wrapperClassName="datePicker"
            id="endTime"
            selected={newRowData.endTime}
            onChange={(date) => handleDateChange('endTime', date)}
            dateFormat="MMMM d, yyyy"
            required // Add HTML5 validation for required field
          />
        </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <Select
            id="status"
            name="status"
            value={newRowData.status}
            options={statusOptions}
            onChange={handleStatusChange}
            required // Add HTML5 validation for required field
          />
        </div>
        <div className="form-group">
          <label htmlFor="techStack">Tech Stack</label>
          <TextField
          fullWidth
          size='small'
            type="text"
            id="techStack"
            name="techStack"
            value={newRowData.techStack}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions  ">
          <Button variant='outlined'  onClick={onClose}>
            Close
          </Button>
          <Button variant='contained'  onClick={handleCreate}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePopup;
