import React, { useState, useEffect } from 'react';
import './Filter.css';

function FilterComponent({ onFilter, onCancel, techStackOptions, statusOptions }) {
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [availableTechStacks, setAvailableTechStacks] = useState([]);

  useEffect(() => {
    // Fetch tech stack options from the backend when the component mounts
    fetchTechStackOptions();
  }, []);

  const fetchTechStackOptions = async () => {
    try {
      // Replace with your API endpoint to fetch tech stack options
      const response = await fetch('http://localhost:8080/api/auth/getTechStackOptions');
      if (response.ok) {
        const data = await response.json();
        setAvailableTechStacks(data);
      } else {
        console.error('Failed to fetch tech stack options.');
      }
    } catch (error) {
      console.error('Error fetching tech stack options:', error);
    }
  };

  const handleFilterClick = () => {
    onFilter(selectedTechStack, selectedStatus);
  };

  const handleCancelClick = () => {
    setSelectedTechStack('');
    setSelectedStatus('');
    onCancel();
  };

  return (
    <div className="filter-container">
      <select
        value={selectedTechStack}
        onChange={(e) => setSelectedTechStack(e.target.value)}
      >
        <option value="">Select Tech Stack</option>
        {availableTechStacks.map((stack) => (
          <option key={stack} value={stack}>
            {stack}
          </option>
        ))}
      </select>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="inprogress">In-Progress</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <button onClick={handleFilterClick}>Filter</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
}

export default FilterComponent;
