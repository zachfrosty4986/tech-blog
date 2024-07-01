//signup function
const signUp = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value
    const name = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    if (email && name && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, name, password }),
            headers: { 'Content-Type': 'application/json', },
        })

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to signup, please try again.')
        }
    }
};

document.querySelector('#signUpBtn').addEventListener('click', signUp);