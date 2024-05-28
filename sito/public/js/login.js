/**
 * Gestisce l'evento di submit del form di login.
 * @function
 * @param {Event} event - L'evento di submit del form.
 */
document.getElementById('loginForm').addEventListener('submit', function(event) {   // Aggiunge un listener al form di login che ascolta l'evento submit
    event.preventDefault();                                                 // Impedisce l'evento predefinito che andrebbe a ricaricare la pagina
    
    const email = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;
    
    /**
     * Effettua una richiesta POST al server per effettuare il login di un utente.
     * @name fetchLogin
     * @function
     * @param {string} email - L'email dell'utente che tenta il login.
     * @param {string} password - La password dell'utente che tenta il login.
     */
    fetch('/login', {                                   // Invia richiesta POST all'endpoint login
        method: 'POST',                                 // Specifica che é POST
        headers: {
            'Content-Type': 'application/json'          // Specifica che i dati sono in formato JSON
        },
        body: JSON.stringify({ email, password })       // I dati vengono convertiti in stringa JSON
    })
    .then(response => response.json())                  // Converte la risposta HTTP restituita da fetch in JSON
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
