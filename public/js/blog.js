const newBlog = async (event) => {
    //adds a new blog
    event.preventDefault();

    const title = document.querySelector('#title').value
    const content = document.querySelector('#blogContent').value

    console.log(title, content)
    if (title && content) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
              },
        })

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('failed to create new post, please try again.')
        }
    }
}

//function to delete blog
const deletebtn = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post, try again');
      }
    }
  };
  
document.querySelector('#submitBlog').addEventListener('click', newBlog);
document.querySelector('#delete').addEventListener('click', deletebtn);