import axios from "axios";


export const createProjectAllocation = async (projectData) => {
  console.log(projectData);
  let createProject = await axios
    .post('https://localhost:8000/dashboard/createProject', {
      project_name: projectData.projectName,
    
      project_manager: projectData.projectManager,
      start_date: projectData.startDate,
      end_date: projectData.endDate,
      status: projectData.status,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return createProject;
};

export const updateProject = async (projectData) => {
  console.log(projectData);
  let updateEvent = await axios
    .post('https://localhost:8000/dashboard/upcoming_event/update', {
      id: projectData.id,
      date: projectData.date,
      description: projectData.description,
      event_name: projectData.event_name,
      start_time: projectData.start_time,
      end_time: projectData.end_time,
      venue: projectData.venue,
      organizer: projectData.organizer,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return updateEvent;
};