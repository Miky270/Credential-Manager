document.getElementById('forgotForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotemail').value;
    
    fetch('/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Password reset link sent!');
        } else {
            alert('Failed to send reset link: ' + data.message);
        }
    });
});
