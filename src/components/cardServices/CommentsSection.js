import React, { useEffect, useState } from 'react';
import initialComments from './comments.json'; // Rename the imported comments array

function CommentsSection({ serviceId }) {
    const [comments, setComments] = useState([]); // Initialize with an empty array

    useEffect(() => {
        fetchCommentsData(serviceId)
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, [serviceId]);

    // Function to fetch comments data based on the service ID
    const fetchCommentsData = async (serviceId) => {
        // Filter comments based on the serviceId
        const filteredComments = initialComments.filter(comment => comment.serviceId == serviceId);
        return filteredComments;
    };

    if (!comments || comments.length === 0) {
        return (
            <div className="comments-section">
                <h2>No comments available</h2>
            </div>
        );
    }

    return (
        <div className="comments-section">
            <h2>Comments</h2>
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="comment-header">
                        <div className="comment-profile">
                            <img src={comment.profilePicture} alt="Profile" className="profile-picture" />
                            <div className="profile-info">
                                <p className="profile-name">{comment.name}</p>
                                <div className="profile-rating">
                                    {renderStars(comment.rating)}
                                </div>
                            </div>
                        </div>
                        <button className="reply-button">Reply</button>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                </div>
            ))}
        </div>
    );
}

function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<span key={i} className="star">&#9733;</span>);
        } else {
            stars.push(<span key={i} className="star">&#9734;</span>);
        }
    }
    return stars;
}

export default CommentsSection;
