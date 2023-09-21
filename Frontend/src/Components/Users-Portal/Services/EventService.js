import axios from "axios";




export const getProject = async () => {
  let getAllProject = await axios
    .get('https://localhost:8000/dashboard/upcoming_project/get')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
  return getAllProject;
};
