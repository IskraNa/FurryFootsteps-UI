import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileDetailsForm.css";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import getUserPosterRequests from "../../services/userService/getUserPosterRequests";
import getUserRequesterRequests from "../../services/userService/getUserRequesterRequests";
import acceptRequest from "../../services/requestService/acceptRequest";
import declineRequest from "../../services/requestService/declineRequest";
import { toast } from "react-toastify";

const ProfileDetailsForm = ({ user, userPosts, refreshUserPosts }) => {
  const navigate = useNavigate();
  const [postRequestsPoster, setPostRequestsPosters] = useState([]);
  const [postRequestsRequester, setPostRequestsRequester] = useState([]);

  const fetchPostRequestsPoster = async (userId) => {
    try {
      const response = await getUserPosterRequests(userId);
      setPostRequestsPosters(response);
    } catch (error) {
      console.error("Error fetching post requests:", error);
    }
  };

  const fetchPostRequestsRequester = async (userId) => {
    try {
      const response = await getUserRequesterRequests(userId);
      setPostRequestsRequester(response);
    } catch (error) {
      console.error("Error fetching post requests:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPostRequestsPoster(user.id);
      fetchPostRequestsRequester(user.id);
    }
  }, [user]);

  const handleAccept = async (requestId, availabilityId) => {
    try {
      const response = await acceptRequest(requestId, availabilityId);
      fetchPostRequestsPoster(user.id);
      fetchPostRequestsRequester(user.id);
      toast.success("You successfully accepted the request.");
    } catch (error) {
      console.error("Error accepting request:", error.message);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await declineRequest(requestId);
      console.log("Decline response:", response);
      fetchPostRequestsPoster(user.id);
      fetchPostRequestsRequester(user.id);

      toast.success("You successfully declined the request.");
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

  const handlePostDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      refreshUserPosts(user.id);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  const handleEdit = (post) => {
    navigate("/addService", { state: { post } });
  };

  if (!user) {
    return (
      <div className="profile-details-container">
        <div className="profile-header">
          Want to view your profile?
          <Link to="/login" className="button">
            Login first.
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-details-container">
      <div className="profile-header">
        {user && (
          <img
            src={require("../../assets/post2.png")}
            alt={`${user.name} ${user.surname}`}
            className="user-image"
          />
        )}
        Profile Details
      </div>
      <div className="details-flex">
        <div className="profile-info">
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
                      src={require("../../assets/post1.jpg")}
                      alt={service.activityTypeName}
                      className="service-image"
                    />
                  </Link>
                  <h4>{service.activityTypeName}</h4>
                  <p>{service.description}</p>
                  <button
                    className="button edit"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="button delete"
                    onClick={() => handlePostDelete(service.id)}
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
          <h2>Requests on your Posts</h2>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Requested By</th>
                <th>Post</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postRequestsPoster.length === 0 ? (
                <tr>
                  <td colSpan="4">No requests on your posts found.</td>
                </tr>
              ) : (
                postRequestsPoster.map((request) => (
                  <tr key={request.id}>
                    <td>{request.userRequesterName}</td>
                    <td>
                      <Link to={`/details/${request.postId}`}>
                        {request.postName}
                      </Link>
                    </td>
                    <td> {request.availabilityTime}</td>
                    <td>
                      <button
                        className="button accept"
                        onClick={() =>
                          handleAccept(
                            request.requestId,
                            request.availabilityId
                          )
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="button decline"
                        onClick={() => handleDecline(request.requestId)}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="requests-section">
          <h2>Your Requests on other Posts</h2>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Posted By</th>
                <th>Post</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {postRequestsRequester.length === 0 ? (
                <tr>
                  <td colSpan="4">No requests on other posts found.</td>
                </tr>
              ) : (
                postRequestsRequester.map((request) => (
                  <tr key={request.id}>
                    <td>{request.userPosterName}</td>
                    <td>
                      <Link to={`/details/${request.postId}`}>
                        {request.postName}
                      </Link>
                    </td>
                    <td>{request.availabilityTime} </td>
                    <td className={`status-${request.status.toLowerCase()}`}>
                      {request.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
