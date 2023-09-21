import React from 'react';
import './Project.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from "dayjs"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
function MyTable({ data, onEditClick, onDeleteClick }) {
  // return (
  //   <table className="table table-responsive">
  //     <thead>
  //       <tr>
  //         <th>Check</th>
  //         <th>Project Name</th>
  //         <th>Project Manager</th>
  //         <th>Start Time</th>
  //         <th>End Time</th>
  //         <th>Tech Stack</th>
  //         <th>Status</th>
  //         <th>Modify</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {data.map((row) => (
  //         <tr key={row._id}>
  //           <td>
  //             <input type="checkbox" />
  //           </td>
  //           <td>{row.projectName}</td>
  //           <td>{row.projectManagerName}</td>
  //           <td>{row.startTime}</td>
  //           <td>{row.endTime}</td>
  //           <td>{row.techStack}</td>
  //           <td>{row.status}</td>
  //           <td>
  //             <button onClick={() => onEditClick(row)}>Edit</button>
  //             <button onClick={() => onDeleteClick(row)}>Delete</button>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} stickyHeader  aria-label="simple table">
      <TableHead   >
        <TableRow
          >
          <TableCell sx={{fontWeight:"700"}}>Project Name</TableCell>
          <TableCell sx={{fontWeight:"700"}} >Project Manager</TableCell>
          <TableCell sx={{fontWeight:"700"}} >Start Time</TableCell>
          <TableCell sx={{fontWeight:"700"}} >End Time</TableCell>
          <TableCell sx={{fontWeight:"700"}} >Tech Stack</TableCell>
          <TableCell sx={{fontWeight:"700"}} align='center' >Status</TableCell>
          <TableCell sx={{fontWeight:"700"}} >Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell style={{minWidth:"100px"}} component="th" scope="row">{row.projectName}</TableCell>
            <TableCell style={{minWidth:"100px"}} >{row?.projectManagerName}</TableCell>
            <TableCell style={{minWidth:"100px"}} >{dayjs(row?.startTime).format("DD MMM YYYY")}</TableCell>
            <TableCell style={{minWidth:"100px"}} >{dayjs(row?.endTime).format("DD MMM YYYY")}</TableCell>
            <TableCell style={{minWidth:"100px"}} >{row?.techStack}</TableCell>
            <TableCell style={{minWidth:"100px"}}  > {row?.status === "completed" ? <div style={{ background:"#00ff0020",padding:"5px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"25px",fontWeight:"600" }} > Completed </div> : row?.status === "inprogress" ? <div style={{ background:"#000ff020",padding:"5px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"25px",fontWeight:"600" }} > inprogress </div>   :<div style={{ background:"lightgray",padding:"5px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"25px",fontWeight:"600" }} > {row?.status}</div>  }</TableCell>
            <TableCell style={{minWidth:"100px"}} >
            <div style={{display:"flex",alignItems:"center",gap:"5px"}} >
             <EditOutlinedIcon color='primary' sx={{cursor:"pointer"}} onClick={() => onEditClick(row)} />
              <DeleteOutlineOutlinedIcon color='error' sx={{cursor:"pointer"}} onClick={() => onDeleteClick(row)} /> 
            </div>
             </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default MyTable;


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