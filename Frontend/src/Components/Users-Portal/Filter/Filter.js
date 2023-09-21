import React, { useState } from 'react';
import './Filter.css';


function FilterComponent({ onFilter, onCancel, techStackOptions, statusOptions }) {
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

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
        {techStackOptions.map((stack) => (
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
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button onClick={handleFilterClick}>Filter</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
}

export default FilterComponent;












// import React, { useState } from "react";
// import "./Filter.css";

// function FilterBar({ onSearch, onCancel, projectNames, statuses ,filterName }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedProject, setSelectedProject] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [techStack, setTechStack] = useState("");
//   const [suggestedTechStack, setSuggestedTechStack] = useState([]);

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     // Create a search object with the selected filters and search term
//     const searchObject = {
//       project: selectedProject,
//       status: selectedStatus,
//       techStack: techStack,
//       searchTerm: searchTerm,
//     };
//     onSearch(searchObject);
//   };

//   const handleCancel = () => {
//     // Clear all filter values and the search term
//     setSearchTerm("");
//     setSelectedProject("");
//     setSelectedStatus("");
//     setTechStack("");
//     setSuggestedTechStack([]);
//     onCancel();
//   };

//   const handleProjectChange = (e) => {
//     setSelectedProject(e.target.value);
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };

//   const handleTechStackChange = (e) => {
//     const stack = e.target.value;
//     setTechStack(stack);
//     // Here, you can implement logic to suggest tech stack based on user input
//     // For example, fetch suggestions from a backend API
//     // For now, let's assume you have a list of suggestions
//     const suggestions = ["Tech1", "Tech2", "Tech3"]; // Replace with your suggestions
//     setSuggestedTechStack(suggestions.filter((s) => s.includes(stack)));
//   };

//   const handleTechStackSuggestionClick = (suggestion) => {
//     setTechStack(suggestion);
//     setSuggestedTechStack([]); // Clear suggestions
//   };

//   return (
//     <div className="search-bar-container1">
      
//       <select
//         className="dropdown"
//         value={selectedProject}
//         onChange={handleProjectChange}
//       >
//         <option value="">Select Project</option>
//         {projectNames && projectNames.map((project) => (
//           <option key={project} value={project}>
//             {project}
//           </option>
//         ))}

//       </select>
//       <select
//         className="dropdown"
//         value={selectedStatus}
//         onChange={handleStatusChange}
//       >
//         <option value="">Select Status</option>
//         {statuses && statuses.map((status) => (
//           <option key={status} value={status}>
//             {status}
//           </option>
//         ))}

//       </select>
//       <input
//         className="tech-stack-input"
//         type="text"
//         placeholder="Tech Stack"
//         value={techStack}
//         onChange={handleTechStackChange}
//       />
//       {suggestedTechStack.length > 0 && (
//         <div className="tech-stack-suggestions">
//           {suggestedTechStack.map((suggestion) => (
//             <div
//               key={suggestion}
//               className="suggestion"
//               onClick={() => handleTechStackSuggestionClick(suggestion)}
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       )}
//       <button className="btn-search" onClick={handleSearch}>
//         Search
//       </button>
//       <button className="btn-search" onClick={handleCancel}>
//         Cancel
//       </button>{" "}
     
//     </div>
//   );
// }

// export default FilterBar;
