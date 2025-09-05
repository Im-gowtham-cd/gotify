function checkUsername(username) {
    if (username.toLowerCase() === 'gotamu') {
        return true;
    }
    return false;
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username').value;
    
    if (checkUsername(usernameInput)) {
        window.location.href = 'HTML/playlist.html';
    } else {
        alert('Access denied. Incorrect username.');
    }
});