// Function to add a new blog post
const newBlog = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get input values from form
  const name = document.querySelector('#title').value;
  const description = document.querySelector('#blogContent').value;

  console.log(name, description); // Log values to console for debugging

  // Check if both name and description are provided
  if (name && description) {
      // Send POST request to create a new blog post
      const response = await fetch('/api/blog', {
          method: 'POST',
          body: JSON.stringify({ name, description }),
          headers: {
              'Content-Type': 'application/json', // Specify content type as JSON
          },
      });

      // Check if the request was successful
      if (response.ok) {
          document.location.replace('/profile'); // Redirect to profile page on success
      } else {
          alert('Failed to create new post, please try again.'); // Show alert on failure
      }
  }
};

// Function to delete a blog post
const deletebtn = async (event) => {
  if (event.target.hasAttribute('data-id')) { // Check if clicked element has data-id attribute
      const id = event.target.getAttribute('data-id'); // Get blog post ID from data-id attribute

      // Send DELETE request to delete the blog post
      const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
      });

      // Check if the request was successful
      if (response.ok) {
          document.location.replace('/profile'); // Redirect to profile page on success
      } else {
          alert('Failed to delete post, try again'); // Show alert on failure
      }
  }
};

// Event listener for adding new blog post
document.querySelector('#submitBlog').addEventListener('click', newBlog);

// Event listener for deleting a blog post
document.querySelector('#delete').addEventListener('click', deletebtn);
