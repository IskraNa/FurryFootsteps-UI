import axiosInstance from "../axiosInstance";

const getPostById = async (id) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getPostById;
