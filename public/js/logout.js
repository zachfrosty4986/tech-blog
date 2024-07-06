// Function to handle user logout
const logout = async () => {
    // Send a POST request to logout the user
    const response = await fetch('/api/login/logout', {
        method: 'POST', // Specify the HTTP method
    });

    // Check if the logout request was successful
    if (response.ok) {
        document.location.replace('/'); // Redirect to the home page on successful logout
    } else {
        alert('Failed to logout, please try again.'); // Alert the user on logout failure
    }
};

// Event listener for the logout button click event
document.querySelector('#logoutBtn').addEventListener('click', logout);
