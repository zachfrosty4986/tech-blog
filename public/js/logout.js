//logout function
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
    })

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout, please try again.')
    }
}

document.querySelector('#logoutBtn').addEventListener('click', logout);