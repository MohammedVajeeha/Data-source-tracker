import React, { useState } from 'react';
import EditPopup from '../Popups/EditPopup';
import TableComponent from './TableComponent'; // Make sure to import TableComponent or the correct component you are using

function ParentComponent({ tableData, updateTableData }) {
  const [editData, setEditData] = useState(null);

  // Function to handle the edit button click
  const handleEditClick = (data) => {
    setEditData(data);
  };

  // Function to handle the save button click in the EditPopup
  const handleSaveEdit = (editedData) => {
    // Call the function to update table data
    updateTableData(editedData);

    // Clear the editData state and close the EditPopup
    setEditData(null);
  };

  return (
    <div>
      <TableComponent
        tableData={tableData}
        onEditClick={handleEditClick} // Pass the edit click handler to TableComponent
      />

      {/* Conditionally render the EditPopup */}
      {editData && (
        <EditPopup
          data={editData}
          onSave={handleSaveEdit}
          onClose={() => setEditData(null)} // Close the EditPopup when canceled
        />
      )}
    </div>
  );
}

export default ParentComponent;
