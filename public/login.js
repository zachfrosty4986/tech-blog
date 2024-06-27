//login function
const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json', },
        })

        if (response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to login, please try again.')
        }
    }
}

document.querySelector('#loginBtn').addEventListener('click', login);