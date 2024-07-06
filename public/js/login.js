// Function to handle user login
const login = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the email and password values from the input fields
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Check if both email and password are provided
    if (email && password) {
        // Send a POST request to login the user
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }), // Convert user credentials to JSON format
            headers: { 'Content-Type': 'application/json', }, // Set request headers
        });

        // Check if the login request was successful
        if (response.ok) {
            document.location.replace('/profile'); // Redirect to the user's profile page on successful login
        } else {
            alert('Failed to login, please try again.'); // Alert the user on login failure
        }
    }
};

// Event listener for the login button click event
document.querySelector('#loginBtn').addEventListener('click', login);
