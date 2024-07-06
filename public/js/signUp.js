// Function to handle user signup
const signUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve user input values from form fields
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Check if all required fields are filled
    if (email && name && password) {
        // Send a POST request to create a new user
        const response = await fetch('/api/login', {
            method: 'POST', // Specify the HTTP method
            body: JSON.stringify({ email, name, password }), // Convert data to JSON string
            headers: { 'Content-Type': 'application/json' }, // Set request headers
        });

        // Check if the signup request was successful
        if (response.ok) {
            document.location.replace('/profile'); // Redirect to the user profile page on success
        } else {
            alert('Failed to signup, please try again.'); // Alert the user on signup failure
        }
    }
};

// Event listener for the signup button click event
document.querySelector('#signUpBtn').addEventListener('click', signUp);
