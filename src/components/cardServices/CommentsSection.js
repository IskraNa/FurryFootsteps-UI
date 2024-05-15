import React, { useEffect, useState } from "react";
import "./CommentsSection.css";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";

function CommentsSection({ reviews, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setComments(reviews);
  }, [reviews]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handlePostComment = async () => {
    console.log("Posting comment:", newComment);
    console.log("Rating:", rating);
    console.log("User", user.id);

    try {
      const formData = new FormData();
      formData.append("comment", newComment);
      formData.append("rating", rating);
      formData.append("postId", user.id);

      //const result = await axiosInstance.post("/reviews/add", formData);
      //console.log("Comment posted successfully:", result.data);
      console.log(formData);

      setNewComment("");
      setRating(0);
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="comments-section">
        <h2>No comments available</h2>
        <textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={handleCommentChange}
          className="comment-textarea"
        />
        <button onClick={handlePostComment} className="post-comment-button">
          Post Comment
        </button>
      </div>
    );
  }

  return (
    <div className="comments-section">
      <h2>Reviews</h2>
      {comments.map((review, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <div className="comment-profile">
              <img
                src={review.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <div className="profile-info">
                <p className="profile-name">{review.user}</p>
                <div className="profile-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
          </div>
          <p className="comment-text">{review.comment}</p>
        </div>
      ))}
      {user && (
        <div>
          <textarea
            placeholder="Write your comment here..."
            value={newComment}
            onChange={handleCommentChange}
            className="comment-textarea"
          />
          <div className="rating-input">
            <label htmlFor="rating">Rate this post (0-5): </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              value={rating}
              onChange={handleRatingChange}
            />
          </div>
          <button onClick={handlePostComment} className="post-comment-button">
            Post Comment
          </button>
          <br />
        </div>
      )}
      {!user && (
        <di>
          Want to post a comment?
          <Link to="/login">Login first.</Link>
          <br />
        </di>
      )}
    </div>
  );
}

function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="star full-star">
          &#9733;
        </span>
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="star half-star">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star empty-star">
          &#9734;
        </span>
      );
    }
  }
  return stars;
}

export default CommentsSection;
