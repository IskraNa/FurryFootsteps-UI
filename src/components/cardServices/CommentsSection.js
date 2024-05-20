import React, { useEffect, useState } from "react";
import "./CommentsSection.css";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import { set } from "date-fns";
import { toast } from "react-toastify";

function CommentsSection({ reviews, user, postId, refreshService }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(0);

  useEffect(() => {
    setComments(reviews);
  }, [reviews]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handlePostComment = async () => {
    try {
      if (!comment) {
        setError("Comment cannot be empty.");
        return;
      }

      if (rating < 0 || rating > 5) {
        setError("Rating must be between 0 and 5.");
        return;
      }

      const formData = {
        comment,
        rating,
        postId,
        userId: user.id,
      };

      const result = await axiosInstance.post("/reviews/add", formData);
      console.log("Comment posted successfully:", result.data);

      setComment("");
      setRating(0);
      refreshService(postId);
      setError("");
      toast.success("Comment posted successfully.");
    } catch (error) {
      setError("Error posting comment. Please try again.");
      console.error("Error posting comment:", error.message);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setEditingText(comment.comment);
    setEditingRating(comment.rating);
  };

  const handleUpdateComment = async () => {
    try {
      if (!editingText) {
        setError("Comment cannot be empty.");
        return;
      }

      if (editingRating < 0 || editingRating > 5) {
        setError("Rating must be between 0 and 5.");
        return;
      }

      const formData = {
        comment: editingText,
        rating: editingRating,
        postId: editingComment.postId,
        userId: user.id,
      };

      const result = await axiosInstance.put(
        `/reviews/${editingComment.id}`,
        formData
      );

      setEditingComment(null);
      setEditingText("");
      setEditingRating(0);
      refreshService(postId);
      setError("");
      toast.success("Comment updated successfully.");
    } catch (error) {
      setError("Error updating comment. Please try again.");
      console.error("Error updating comment:", error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/reviews/${commentId}`);
      console.log("Comment deleted successfully");

      refreshService(postId);
      setError("");
      toast.success("Comment deleted successfully.");
    } catch (error) {
      setError("Error deleting comment. Please try again.");
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <div className="comments-section">
      <h2>Reviews</h2>
      {comments.length === 0 && <h4>No comments available</h4>}
      {comments.map((review) => (
        <div key={review.id} className="comment">
          <div className="comment-header">
            <div className="comment-profile">
              {/* <img
                src={review.profilePicture}
                alt="Profile"
                className="profile-picture"
              /> */}
              <img
                src={`data:image/png;base64,${review.picture}`}
                alt={review.profilePicture}
                className="profile-picture"
              />
              <div className="profile-info">
                <p className="profile-name">{review.user}</p>
                <div className="profile-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
            {user && user.id === review.userId && (
              <div className="comment-actions">
                <button
                  className="edit-comment-button"
                  onClick={() => handleEditComment(review)}
                >
                  Edit
                </button>
                <button
                  className="delete-comment-button"
                  onClick={() => handleDeleteComment(review.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {editingComment && editingComment.id === review.id ? (
            <div>
              <textarea
                className="edit-comment-textarea"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <div className="rating-input edit-rating-input">
                <label htmlFor="edit-rating">Rate this post (0-5): </label>
                <input
                  type="number"
                  id="edit-rating"
                  name="rating"
                  min="0"
                  max="5"
                  value={editingRating}
                  onChange={(e) => setEditingRating(e.target.value)}
                />
              </div>
              <button
                className="update-comment-button"
                onClick={handleUpdateComment}
              >
                Update
              </button>
              <button
                className="cancel-edit-button"
                onClick={() => setEditingComment(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="comment-text">{review.comment}</p>
          )}
        </div>
      ))}
      {user && (
        <div>
          <textarea
            placeholder="Write your comment here..."
            value={comment}
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
          {error && <p className="error-message">{error}</p>}
          <button onClick={handlePostComment} className="post-comment-button">
            Post Comment
          </button>
        </div>
      )}
      {!user && (
        <div className="text-bold">
          Want to post a comment?{"  "}
          <Link to="/login">Login first.</Link>
        </div>
      )}
      <br />
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
