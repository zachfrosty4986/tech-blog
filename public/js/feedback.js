const addComment = async (event) => {

    const commentText = document.querySelector("#commentField").value;
    const blogID = event.target.getAttribute('data-id');
    console.log(commentText, blogID);
 
    if (commentText && blogID) {
       const response = await fetch("/api/comment/", {
          method: "POST",
          body: JSON.stringify({ content: commentText, blog_id: blogID }),
          headers: { "Content-Type": "application/json" },
       });
       console.log(response);
 
       if (response.ok) {
          document.location.replace(`/blog/${blogID}`);
       } else {
          alert('Failed to create comment, try again');
       }
    }
 }
 
 
 document.querySelector('#addComment').addEventListener('click', addComment)