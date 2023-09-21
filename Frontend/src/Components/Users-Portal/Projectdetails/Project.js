import React from 'react';
import './Project.css';

function Table({ data, onEditClick, onDeleteClick }) {
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Check</th>
          <th>Project Name</th>
          <th>Project Manager</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Tech Stack</th>
          <th>Status</th>
          <th>Modify</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{row.projectName}</td>
            <td>{row.projectManagerName}</td>
            <td>{row.startTime}</td>
            <td>{row.endTime}</td>
            <td>{row.techStack}</td>
            <td>{row.status}</td>
            <td>
              <button onClick={() => onEditClick(row)}>Edit</button>
              <button onClick={() => onDeleteClick(row)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;


// import React from 'react';
// import './Project.css';
// function Table({ data, filters, onEditClick, onDeleteClick }) {
//   // Implement filtering logic based on the 'filters' prop
//   const filteredData = data.filter((row) => {
//     // Implement your filtering conditions here
//     // For example, check if 'row.projectName' contains 'filters.projectName'
//     // and so on for other filter fields

//     // Check if 'row.status' is a string, and if it includes 'filters.status'
//     const statusMatch =
//       typeof row.status === 'string'
//         ? row.status.includes(filters.status)
//         : false;

//     return (
//       row.projectName.includes(filters.projectName) &&
//       row.techStack.includes(filters.techStack) &&
//       statusMatch
//     );
//   });


//   return (
//     <table className="table table-responsive">
//       <thead>
//         <tr>
//           <th>Check</th>
//           <th>Project Name</th>
//           <th>Project Manager</th>
//           <th>Start Time</th>
//           <th>End Time</th>
//           <th>Tech Stack</th>
//           <th>Status</th>
//           <th>Modify</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredData.map((row) => (
//           <tr key={row._id}>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>{row.projectName}</td>
//             <td>{row.projectManagerName}</td>
//             <td>{row.startTime}</td>
//             <td>{row.endTime}</td>
//             <td>{row.techStack}</td>
//             <td>{row.status}</td>
//             <td>
//               <button onClick={() => onEditClick(row)}>Edit</button>
//               <button onClick={() => onDeleteClick(row)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default Table;