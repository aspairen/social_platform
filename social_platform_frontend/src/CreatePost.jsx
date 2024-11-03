// CreatePost.js

// Import React for component creation and useState hook for managing state
import React, { useState } from "react";

// Import axios for making HTTP requests
import axios from "axios";

function CreatePost() {
  // Define a state variable to hold the new post data
  const [newPost, setNewPost] = useState({
    title: "",  // Initial empty title
    content: "", // Initial empty content
    file: null,  // Initial file set to null (no file selected)
  });

  // Function to handle changes in input fields (title and content)
  const handleInputChange = (event) => {
    const { name, value } = event.target;  // Destructure name and value from the event object
    setNewPost({ ...newPost, [name]: value });  // Update state with new values
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    setNewPost({ ...newPost, file: event.target.files[0] });  // Update state with selected file
  };

  // Function to handle post submission
  const handlePostSubmit = () => {
    const formData = new FormData();  // Create a FormData object for file upload

    // Append post data to the FormData object
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("file", newPost.file);

    // Send a POST request to the /api/posts endpoint with the FormData
    axios
      .post("http://localhost:5000/api/posts", formData)
      .then((response) => {
        // On successful submission, reset the newPost state to clear the form
        setNewPost({ title: "", content: "", file: null });
      })
      .catch((error) => console.error("Error creating post:", error)); // Handle errors
  };

  // Render the CreatePost component's JSX
  return (
    <div className="create-post">
      <h2>Create a Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newPost.title} // Set input value from newPost state
        onChange={handleInputChange} // Call handleInputChange on change
      />
      <textarea
        name="content"
        placeholder="Content"
        value={newPost.content} // Set textarea value from newPost state
        onChange={handleInputChange} // Call handleInputChange on change
      ></textarea>
      <input type="file" name="file" onChange={handleFileChange} />  {/* File input for selecting file */}
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
}

export default CreatePost;