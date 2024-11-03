// Home.js

// Import React for component creation and useState and useEffect hooks for managing state and side effects
import React, { useState, useEffect } from "react";

// Import axios for making HTTP requests
import axios from "axios";

function Home() {
  // Define state variables to hold the comment input and posts data
  const [commentInput, setCommentInput] = useState("");  // Stores the user's comment input
  const [posts, setPosts] = useState([]);                  // Stores the fetched posts data

  // Fetch posts on component mount using useEffect hook
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")  // GET request to /api/posts endpoint
      .then((response) => setPosts(response.data))  // Update posts state with fetched data
      .catch((error) => console.error("Error fetching posts:", error));  // Handle errors
  }, []);  // Empty dependency array: runs only once on component mount

  // Function to handle liking a post
  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5000/api/posts/like/${postId}`)  // POST request to like a post
      .then((response) => {
        // Update posts state with updated likes after successful like
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error liking post:", error)); // Handle errors
  };

  // Function to handle adding a comment to a post
  const handleAddComment = (postId, commentText) => {
    axios
      .post(`http://localhost:5000/api/posts/comment/${postId}`, {
        text: commentText,  // Send the comment text in the request body
      })
      .then((response) => {
        // Update posts state with updated comments after successful comment
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error adding comment:", error)); // Handle errors
  };

  // Render the Home component's JSX
  return (
    <div className="home">
      <h2>Recent Posts</h2>
      {/* Loop through posts array and render each post */}
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {/* Conditionally render media (image or video) if available */}
          {post.file && (
            <div>
              {post.file.includes(".mp4") ? (
                <video width="320" height="240" controls>
                  <source src={`http://localhost:5000/uploads/${post.file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={`http://localhost:5000/uploads/${post.file}`} alt="Post Media" />
              )}
            </div>
          )}
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
          <p>Comments: {post.comments.length}</p>
          {/* Loop through comments array and render each comment */}
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>

          {/* Input field for adding comment */}
          <input
            type="text"
            placeholder="Add a comment"
            className="comment-input"
            onChange={(e) => setCommentInput(e.target.value)} // Update commentInput state on change
          />
          <button
            onClick={() => handleAddComment(post._id, commentInput)} // Trigger comment addition
            className="comment-button"
          >
            Add Comment
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;