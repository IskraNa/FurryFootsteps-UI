import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileDetailsForm.css";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditProfileForm from "../editProfileForm/EditProfileForm";

const ProfileDetailsForm = ({ user, userPosts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(userPosts || []);
  const [postRequests, setPostRequests] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () =>{
    setEditMode(!editMode);
  }
  useEffect(() => {
    setPosts(userPosts || []);
  }, [userPosts]);

  useEffect(() => {
    const fetchPostRequests = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/getRequestsById/${userId}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPostRequests(data);
          } else {
            console.log("No post requests found for user ID:", userId);
          }
        } else {
          console.error(
            "Failed to fetch post requests:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching post requests:", error);
      }
    };

    if (user) {
      fetchPostRequests(user.id);
    }
  }, [user]);

  const fetchUserIdByPostId = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/posts/${postId}/user`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user ID by post ID:", error);
      return null;
    }
  };

  const handleAccept = async (requestId) => {
    try {
      // Remove the accepted request from the postRequests array
      setPostRequests(postRequests.filter(request => request.id !== requestId));
      // Display success alert
      alert("You successfully accepted the request.");
    } catch (error) {
      console.error("Error accepting request:", error.message);
    }
  };
  
  const handleDecline = async (requestId) => {
    try {
      // Remove the declined request from the postRequests array
      setPostRequests(postRequests.filter(request => request.id !== requestId));
      // Display success alert
      alert("You successfully declined the request.");
    } catch (error) {
      console.error("Error declining request:", error.message);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    try {
      await axiosInstance.post("/users/logout");
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
      console.log("Post deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  const handleEdit = (post) => {
    navigate("/addService", { state: { post } });
  };
  // const handleEditProfile = async (updatedUserData) =>{
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/api/users/${user.id}`
  //     );
  //     console.log("Updating profile with data:", updatedUserData);
      
  //     setEditMode(false);
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };

  return (
  <div className="profile-details-container">
   
    <div className="details-flex">
      {editMode ? (
        <div>
        <EditProfileForm user = {user} onCancel={toggleEditMode}/>
        <button className="button edit-information" onClick={toggleEditMode}>
          &larr; Back to your profile page
        </button>
        </div>
    ) : (
      
      <div className="profile-info">
         <div className="profile-header">
          { (user  && user.picture) ?  (
              <img 
                src={`data:image/png;base64,${user.picture}`} 
                alt={user.serviceName} 
                width = "200"
                height= "200"
              />
          ) : (
          <p>No picture</p>
              )}
      
    </div>
        <h2>Information Summary</h2>
        {user && (
          <>
            <p>
              <strong>Full name:</strong> {`${user.name} ${user.surname}`}
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
          </>
        )}

        <button className="button logout" onClick={handleLogout}>
          Logout
        </button>
        <button className="button edit-information" onClick={toggleEditMode}>
          Update Information
        </button>
      </div>)}
      
      <div className="services-details">
        <h2>Your Posts</h2>
        <div className="services-list">
          {userPosts.length === 0 ? (
            <p>You don't have any posts. Create here!</p>
          ) : (
            userPosts.map((service) => (

    
              <div key={service.id} className="service-item">
                <Link to={`/details/${service.id}`}>
                {service.picture ? (
                  <img 
                  src={`data:image/png;base64,${service.picture}`} 
                  alt={service.serviceName} 
                  width = "150"
                  height= "150"
                  />
                  ) : (
                  <p>Loading...</p>
                    )}
                </Link>
                <h4>
                  {service.activityType
                    ? service.activityType.type
                    : "N/A"}
                </h4>
                <p>{service.description}</p>
                <button
                  className="button edit"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="button delete"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        <Link to="/addService" className="button add-service">
          Add a new post +
        </Link>
      </div>
      <div className="requests-section">
        <h2>Post Requests</h2>
        <ul>
          {postRequests.length === 0 ? (
            <p>No post requests found.</p>
          ) : (
            postRequests.map((request) => (
              <li key={request.id}>
                <span>
                  User: {`${request.user.name}`}
                </span>
                <span> Post Description: {request.post?.description}</span>
                <span> Post: {request.post?.id}</span>
                <button
                  className="button accept"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </button>
                <button
                  className="button decline"
                  onClick={() => handleDecline(request.id)}
                >
                  Decline
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  </div>
);
};

export default ProfileDetailsForm;
