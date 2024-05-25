class Credential {
    constructor(site, username, password, notes) {
        this.site = site;
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.date = new Date().toLocaleString();
    }
}

class CredentialManager {
    constructor() {
        this.lista = new Map();
        this.loadFromLocalStorage();
    }

    addCredentials(site, username, password, notes) {
        const credential = new Credential(site, username, password, notes);
        this.lista.set(site, credential);
        this.saveToLocalStorage();
    }

    loadFromLocalStorage() {
        const storedCredentials = localStorage.getItem('credentials');
        if (storedCredentials) {
            const parsedCredentials = JSON.parse(storedCredentials);
            parsedCredentials.forEach(([site, credential]) => {
                this.lista.set(site, new Credential(
                    credential.site, 
                    credential.username, 
                    credential.password, 
                    credential.notes
                ));
            });
        }
    }

    saveToLocalStorage() {
        const credentialsArray = Array.from(this.lista.entries());
        localStorage.setItem('credentials', JSON.stringify(credentialsArray));
    }

    printCredentials() {
        const credentialsList = document.getElementById('credentialsList');
        credentialsList.innerHTML = '';
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

function printCredentials() {
    window.open('credential.html', '_blank');
}

function printCredentials() {
    credentialManager.printCredentials();
}

function login() {
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    alert('Site:', site);
    alert('Credential:', credentialManager.get(site));

    if (site && username && password) {
        const credential = credentialManager.get(site);
        if (credential) {
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