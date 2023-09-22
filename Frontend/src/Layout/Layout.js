import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterComponent from '../Components/Users-Portal/Filter/Filter';
import SearchBarComponent from '../Components/Users-Portal/Filter/Searchbar';
import { Button, Modal } from '@mui/material';
import MyTable from '../Components/Users-Portal/Projectdetails/Project';
import CreatePopup from '../Components/Users-Portal/Popups/CreatePopup';
import EditPopup from '../Components/Users-Portal/Popups/EditPopup';

function Layout() {
  // State variables
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [isCreatePopupVisible, setCreatePopupVisible] = useState(false);
  const [newRowData, setNewRowData] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [techStackOptions, setTechStackOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [techStackFilter, setTechStackFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/auth/fetchRows');
    setRowData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  // Handle editing a row
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShowEditPopup(true);
  };

  // Handle creating a new row
  const handleCreateClick = () => {
    setCreatePopupVisible(true);
    setNewRowData({
      projectName: '',
      projectManagerName: '',
      startTime: null,
      endTime: null,
      techStack: '',
      status: null,
    });
  };

  // Handle closing the create popup
  const handleClosePopup = () => {
    setCreatePopupVisible(false);
  };

  // Handle saving data
  const handleSaveData = (data) => {
    console.log('Data to be saved:', data);
    fetchData();
    setNewRowData(data);
  };

  // Handle closing the create popup
  const handleCloseCreatePopup = () => {
    setShowCreatePopup(false);
  };

  // Handle closing the edit popup
  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
    setSelectedRow(null);
  };

  // Handle saving data when creating a new row
  const handleSaveCreatePopup = async (newRowData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/createRow', newRowData);
      console.log('Newly created data:', response.data);

      const updatedData = await axios.get('http://localhost:8080/api/auth/fetchRows');
      setData(updatedData.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Handle saving data when editing a row
  const handleSaveEditPopup = async (editedRowData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/auth/projects/${editedRowData._id}`,
        editedRowData
      );

      if (response.status === 200) {
        const updatedData = data.map((row) =>
          row._id === editedRowData._id ? editedRowData : row
        )
        setData(updatedData);
        fetchData()
        setShowEditPopup(false);
      } else {
        console.error('Failed to update data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Fetch tech stack options from the backend
  useEffect(() => {
    const fetchTechStackOptions = async () => {
      try {
        const response = await fetch('/api/auth/techStackOptions');
        const data = await response.json();
        setTechStackOptions(data);
      } catch (error) {
        console.error('Error fetching tech stack options:', error);
      }
    };

    fetchTechStackOptions();
  }, []);

  // Handle filtering
  const handleFilter = (techStack, status) => {
    setTechStackFilter(techStack);
    setStatusFilter(status);
  };

  // Handle canceling filters
  const handleCancel = () => {
    setTechStackFilter('');
    setStatusFilter('');
  };

  // Handle searching
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="" style={{ padding: "20px 15px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          background: "#fff",
          padding: "10px 5px",
          borderRadius: "8px",
          boxShadow: "1px 1px 16px #00000020",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <FilterComponent
          techStackOptions={techStackOptions}
          statusOptions={statusOptions}
          onFilter={handleFilter}
          onCancel={handleCancel}
          initialStatus="inprogress" // Set the initial status here
        />
        <SearchBarComponent
          onSearch={handleSearch}
        />
        <Button variant='contained' onClick={handleCreateClick}>
          Create
        </Button>
      </div>

      <MyTable
        data={rowData}
        onFilter={handleFilter}
        onCancel={handleCancel}
        onSearch={handleSearch}
        techStackOptions={techStackOptions}
        statusOptions={statusOptions}
        onEditClick={handleEditClick}
        onDeleteClick={async (row) => {
          try {
            await axios.delete(`http://localhost:8080/api/auth/delete/${row._id}`);
            const updatedData = await axios.get('http://localhost:8080/api/auth/fetchRows');
            setData(updatedData.data);
          } catch (error) {
            console.log('Error deleting data:', error);
          }
        }}
      />

      {showCreatePopup && (
        <CreatePopup onSave={handleSaveCreatePopup} onClose={handleCloseCreatePopup} />
      )}

      {showEditPopup && selectedRow && (
        <Modal
          open={showEditPopup}
          onClose={handleCloseEditPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} >
            <EditPopup
              data={selectedRow}
              onSave={handleSaveEditPopup}
              onClose={handleCloseEditPopup}
            />
          </div>
        </Modal>
      )}

      {isCreatePopupVisible && (
        <Modal
          open={isCreatePopupVisible}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }} >
            <CreatePopup
              onSave={handleSaveData}
              onClose={handleClosePopup}
              initialData={newRowData}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Layout;
