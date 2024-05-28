/**
 * Gestisce l'evento di submit del form di registrazione.
 * @function
 * @param {Event} event - L'evento di submit del form.
 */
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('regemail').value;
    const password = document.getElementById('regpass').value;
    
    /**
     * Effettua una richiesta POST al server per registrare un nuovo utente.
     * @name fetchRegister
     * @function
     * @param {string} email - L'email dell'utente da registrare.
     * @param {string} password - La password dell'utente da registrare.
     */
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registrazione avvenuta con successo!');
        } else {
            alert('Registrazione fallita: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore. Per favore riprova.');
    });
});
