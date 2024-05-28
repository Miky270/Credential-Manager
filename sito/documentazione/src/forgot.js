/**
 * Gestisce l'evento di submit del form di recupero password.
 * @function
 * @param {Event} event - L'evento di submit del form.
 */
document.getElementById('forgotForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotemail').value;
    
    /**
     * Effettua una richiesta POST al server per inviare un link di reset password.
     * @name fetchForgotPassword
     * @function
     * @param {string} email - L'email dell'utente che ha dimenticato la password.
     */
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
            alert('Link per il reset della password inviato!');
        } else {
            alert('Invio del link di reset fallito: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore. Per favore riprova.');
    });
});
