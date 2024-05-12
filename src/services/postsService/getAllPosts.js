import axiosInstance from "../axiosInstance";

const getAllPosts = async (page, activityTypeId) => {
  try {
    let requestParamForActivityType = "";
    let requestParamForPage = "";

    if (activityTypeId) {
      requestParamForActivityType = `&activityTypeId=${activityTypeId}`;
    }

    if (page) {
      requestParamForPage = `&page=${page}`;
    }

    const endpoint = "/posts/paginated?";
    const response = await axiosInstance.get(
      `${endpoint}${requestParamForPage}${requestParamForActivityType}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllPosts;
