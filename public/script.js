document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        document.getElementById('signupForm').reset();
    })
    .catch(error => console.error('Error:', error));
});
