import React, { useEffect, useState } from "react";
import "./CommentsSection.css";

function CommentsSection({ reviews }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setComments(reviews);
  }, [reviews]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostComment = () => {
    // Add logic to post the comment to the backend or update state
    console.log("Posting comment:", newComment);
    // Clear the textarea after posting the comment
    setNewComment("");
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
      <textarea
        placeholder="Write your comment here..."
        value={newComment}
        onChange={handleCommentChange}
        className="comment-textarea"
      />
      <button onClick={handlePostComment} className="post-comment-button">
        Post Comment
      </button>
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
