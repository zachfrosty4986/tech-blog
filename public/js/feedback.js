// Function to add a new comment to a blog post
const addComment = async (event) => {
   // Prevent default form submission behavior
   event.preventDefault();

   // Get the comment text and blog ID from the input fields
   const commentText = document.querySelector("#commentField").value;
   const blogID = event.target.getAttribute('data-id');
   console.log(commentText, blogID); // Log comment text and blog ID to console for debugging

   // Check if both comment text and blog ID are provided
   if (commentText && blogID) {
       // Send a POST request to create a new comment
       const response = await fetch("/api/comment/", {
           method: "POST",
           body: JSON.stringify({ content: commentText, blog_id: blogID }),
           headers: { "Content-Type": "application/json" },
       });
       console.log(response); // Log the response to console for debugging

       // Check if the request was successful
       if (response.ok) {
           document.location.replace(`/blog/${blogID}`); // Redirect to the blog post page on success
       } else {
           alert('Failed to create comment, try again'); // Show alert on failure
       }
   }
};

// Event listener for adding a new comment
document.querySelector('#addComment').addEventListener('click', addComment);
