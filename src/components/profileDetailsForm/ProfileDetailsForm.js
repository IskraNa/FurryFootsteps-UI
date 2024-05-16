import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./ProfileDetailsForm.css";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProfileDetailsForm = ({ user, userPosts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(userPosts);

  useEffect(() => {
    setPosts(userPosts);
  }, [userPosts]);


  if (!user) {
    return (
      <div>
        You don't have a profile yet. Register <Link to="/register">here.</Link>
      </div>
    );
  }

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    try {
      const response = await axiosInstance.post("/users/logout");
      console.log("Logout successful");

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      window.location.reload();
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  const handleEdit = (post) => {
    navigate("/addService", { state: { post } });
  };

  return (
    <div className="profile-details-container">
      <div className="profile-header">
        <img
          src={require("../../assets/post2.png")}
          alt={user.name + " " + user.surname}
          className="user-image"
        />{" "}
        Profile Details
      </div>
      <div className="details-flex">
        <div className="profile-info">
          <h2>Information Summary</h2>
          <p>
            <strong>Full name:</strong> {user.name + " " + user.surname}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Location:</strong> {user.location}
          </p>
          <Link className="button edit-information">Edit Information</Link>
          <button className="button logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="services-details">
          <h2>Your Posts</h2>
          <div className="services-list">
            {userPosts.length === 0 ? (
              <p>You don't have any posts. Create here!</p>
            ) : (
              userPosts.map((service) => (
                <div key={service.id} className="service-item">
                  <Link to={`/details/${service.id}`}>
                    <img
                      //src={service.picture}
                      src={require("../../assets/post1.jpg")}
                      alt={service.activityTypeName}
                      className="service-image"
                    />
                  </Link>

                  <h4>{service.activityTypeName}</h4>
                  <p>{service.description}</p>
                  <button className="button edit" onClick={() => handleEdit(service)}>Edit</button>
                  <button className="button delete" onClick={() => handleDelete(service.id)}></button>
                </div>
              ))
            )}
          </div>
          <Link to="/addService" className="button add-service">
            Add a new post +
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
