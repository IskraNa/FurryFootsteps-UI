import axiosInstance from "../axiosInstance";

const getAllPetTypes = async () => {
  try {
    const response = await axiosInstance.get("/pet-types");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllPetTypes;
