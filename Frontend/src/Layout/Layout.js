import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterComponent from "../Components/Users-Portal/Filter/Filter";
import {
  Autocomplete,
  Button,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import MyTable from "../Components/Users-Portal/Projectdetails/Project";
import CreatePopup from "../Components/Users-Portal/Popups/CreatePopup";
import EditPopup from "../Components/Users-Portal/Popups/EditPopup";
import SearchIcon from "@mui/icons-material/Search";
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
  const [techStackFilter, setTechStackFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    projectName: "",
    techStack: "",
    status: "",
  });

  const fetchData = async () => {
    try {
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        "http://localhost:8080/api/auth/fetchRows",
        { params: searchQuery, headers: headers }
      );

      
      if(response?.status == 401)
      {
        localStorage.clear();
        window.open("/")
      }


      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  // Handle editing a row
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShowEditPopup(true);
  };

  // Handle creating a new row
  const handleCreateClick = () => {
    setCreatePopupVisible(true);
    setNewRowData({
      projectName: "",
      projectManagerName: "",
      startTime: null,
      endTime: null,
      techStack: "",
      status: null,
    });
  };

  // Handle closing the create popup
  const handleClosePopup = () => {
    setCreatePopupVisible(false);
  };

  // Handle saving data
  const handleSaveData = (data) => {
    console.log("Data to be saved:", data);
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
        );
        setData(updatedData);
        fetchData();
        setShowEditPopup(false);
      } else {
        console.error("Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Fetch tech stack options from the backend
  useEffect(() => {
    const fetchTechStackOptions = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        // const response = await axios.get('http://localhost:8080/api/auth/techStackOptions');
        axios
          .get("http://localhost:8080/api/auth/techStackOptions", { headers })
          ?.then((resp) => {
            setTechStackOptions(() => resp?.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching tech stack options:", error);
      }
    };

    fetchTechStackOptions();
  }, []);

  useEffect(() => {
    console.info(techStackFilter, "sample");
  }, [techStackFilter]);

  // Handle searching
  const handleSearch = (key, value) => {
    setSearchQuery((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className=""
      style={{
        padding: "20px 15px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "10px 5px",
          borderRadius: "8px",
          boxShadow: "1px 1px 16px #00000020",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleCreateClick}
          style={{ width: "100px" }}
        >
          Create
        </Button>
        <TextField
          size="small"
          placeholder="Search by Project Name"
          value={searchQuery?.projectName}
          onChange={(e) => {
            handleSearch("projectName", e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* <FilterComponent
          techStackOptions={techStackOptions}
          statusOptions={statusOptions}
          onFilter={handleFilter}
          onCancel={handleCancel}
          initialStatus="inprogress" // Set the initial status here
        /> */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={techStackOptions?.map((o) => ({
              label: o?.toUpperCase(),
              value: o,
            }))}
            // sx={{ width: 300 }}
            onChange={(e, value) => {
              handleSearch("techStack", value?.value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Filter Tech Stack" />
            )}
          />
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={[
              { label: "Completed", value: "COMPLETED" },
              { label: "In Progress", value: "INPROGRESS" },
              { label: "Pending", value: "PENDING" },
            ]}
            onChange={(e, value) => {
              handleSearch("status", value?.value);
            }}
            // sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Filter Status" />
            )}
          />
        </div>
      </div>

      <MyTable
        data={rowData}
        // onFilter={handleFilter}
        // onCancel={handleCancel}
        // onSearch={handleSearch}
        // // techStackOptions={techStackOptions}
          fetchData={fetchData}
        statusOptions={statusOptions}
        onEditClick={handleEditClick}
        onDeleteClick={async (row) => {
          try {
            await axios.delete(
              `http://localhost:8080/api/auth/delete/${row._id}`
            )?.then((resp)=>{
              fetchData() 
            }).catch(error=>alert(JSON.stringify(error)))
          } catch (error) {
            console.log("Error deleting data:", error);
          }
        }}
      />


      {showEditPopup && selectedRow && (
        <Modal
          open={showEditPopup}
          onClose={handleCloseEditPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EditPopup
              data={selectedRow}
              onSave={handleSaveEditPopup}
              onClose={handleCloseEditPopup}
          	  fetchData={fetchData}

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
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CreatePopup
              onSave={handleSaveData}
              onClose={handleClosePopup}
              initialData={newRowData}
              fetchData={fetchData}

            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Layout;
