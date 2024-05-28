/**
 * Rappresenta una singola credenziale.
 * @class
 */
class Credential {
    constructor(site, username, password, notes) {
        this.site = site;
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.date = new Date().toLocaleString();
    }
}

/**
 * Gestisce le credenziali
 * @class
 */
class CredentialManager {
    /**
     * Crea una nuova istanza di CredentialManager
     * @constructs
     */
    constructor() {
        this.lista = new Map();
        this.loadFromServer();
    }

    /**
     * Aggiunge nuove credenziali.
     * @param {string} site - Il sito associato alle credenziali
     * @param {string} username - Lo username associato alle credenziali
     * @param {string} password - La password associata alle credenziali
     * @param {string} notes - Le note associate alle credenziali
     */
    addCredentials(site, username, password, notes) {
        const credential = new Credential(site, username, password, notes);
        this.lista.set(site, credential);
        this.saveToServer();
    }

    /**
     * Carica le credenziali dal server.
     */
    loadFromServer() {
        fetch('/credentials')
            .then(response => response.json())
            .then(data => {
                data.forEach(([site, credential]) => {          // Data é una matrice
                    this.lista.set(site, new Credential(        // Creazione nuovi oggetti
                        credential.site,
                        credential.username,
                        credential.password,
                        credential.notes
                    ));
                });
                this.printCredentials();
            })
            .catch(error => console.error('Error loading credentials:', error));
    }

    /**
     * Salva le credenziali sul server.
     */
    saveToServer() {
        const credentialsArray = Array.from(this.lista.entries());          // Per sicurezza, essendo lista.entries() un oggetto iterabile, ma fetch vuole un dato primitvo
        fetch('/credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentialsArray),
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error('Error saving credentials');
            }
        })
        .catch(error => console.error('Error saving credentials:', error));
    }

    /**
     * Stampa le credenziali.
     */
    printCredentials() {
        const credentialsList = document.getElementById('credentialsList');
        credentialsList.innerHTML = '';                     // Svuota l'elemento div
        this.lista.forEach(credential => {
            const credentialItem = document.createElement('div');
            credentialItem.className = 'credential-item';
            credentialItem.innerHTML = `
                <strong>Sito:</strong> ${credential.site} <br>
                <strong>Username:</strong> ${credential.username} <br>
                <strong>Password:</strong> ${credential.password} <br>
                <strong>Note:</strong> ${credential.notes} <br>
                <strong>Data:</strong> ${credential.date} <br>
            `;
            credentialsList.appendChild(credentialItem);
        });
    }
}

/**
 * Gestisce l'aggiunta di una nuova credenziale.
 */
const credentialManager = new CredentialManager();

function addCredential() {
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const notes = document.getElementById('notes').value;

    credentialManager.addCredentials(site, username, password, notes);

    document.getElementById('site').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('notes').value = '';
}

/**
 * Stampa le credenziali.
 */
function printCredentials() {
    credentialManager.printCredentials();
}

/**
 * Gestisce il login.
 */
function login() {
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (site && username && password) {                 // Verifica se c'é un campo vuoto
        const credential = credentialManager.lista.get(site);
        if (credential) {                               // Verifica se é presenente nel Map
            if (credential.username === username && credential.password === password) {
                alert("Login effettuato con successo!");
            } else {
                alert("Credenziali errate");
            }
        } else {
            alert("Sito non presente nel database");
        }
    } else {
        alert("Inserisci le credenziali");
    }
}
