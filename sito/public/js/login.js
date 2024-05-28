/**
 * Gestisce l'evento di submit del form di login.
 * @function
 * @param {Event} event - L'evento di submit del form.
 */
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;
    
    /**
     * Effettua una richiesta POST al server per effettuare il login di un utente.
     * @name fetchLogin
     * @function
     * @param {string} email - L'email dell'utente che tenta il login.
     * @param {string} password - La password dell'utente che tenta il login.
     */
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login avvenuto con successo!');
        } else {
            alert('Login fallito: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore. Per favore riprova.');
    });
});
