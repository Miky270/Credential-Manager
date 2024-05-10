const prompt = require('prompt-sync')();
//Mappa per le credenziali

const credentials = new Map();
/**
*Classe per le Credenziali
*/
class Credential {
    /**
    *Creare un nuovo ogetto Credenziale
    *@param {string} site - Il nome del sito .
    *@param {string} username - l'Username .
    *@param {string} password - la password .
    *@param {string} note - le note .
    */
    constructor(site, username, password, notes) {
        this.site = site;
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.date = new Date().toLocaleString();
    }
}
/**
* classe per gestire le credenziali
*/
class CredentialManager {
    //mappa per la memorizzazione delle credenziali in liste
    constructor() {
        this.lista = new Map();
    }

    addCredentials(site, username, password, notes) {
        const credential = new Credential(site, username, password, notes);
        this.lista.set(site, credential);
    }

    editCredentials(site, username, password, notes) {
        if (this.lista.has(site)) {
            const credential = this.lista.get(site);
            credential.username = username;
            credential.password = password;
            credential.notes = notes;
            credential.date = new Date().toLocaleString();
        } else {
            console.log("Credenziali non trovate per il sito:", site);
        }
    }

    deleteCredentials(site) {
        if (this.lista.has(site)) {
            this.lista.delete(site);
        } else {
            console.log("Credenziali non trovate per il sito:", site);
        }
    }
}

function main() {
    let credentialManager = new CredentialManager();

    while (true) {
        console.log("\nMenu:");
        console.log("1. Aggiungi credenziali");
        console.log("2. Cerca credenziali");
        console.log("3. Modifica credenziali");
        console.log("4. Elimina credenziali");
        console.log("5. Stampare credenziali");
        console.log("6. Esci");

        const choice = prompt("Scelta: ");

        switch (choice) {
            case "1":
                credentialManager.addCredentials(
                                prompt("Inserisci il sito:"),
                                prompt("Inserisci lo username:"), 
                                prompt("Inserisci la password:"), 
                                prompt("Inserisci le note:")
                            );
                break;
            case "2": break;
            case "3":
                credentialManager.editCredentials(
                                prompt("Inserisci il sito da modificare:"), 
                                prompt("Inserisci il nuovo username:"), 
                                prompt("Inserisci la nuova password:"), 
                                prompt("Inserisci le nuove note:")
                            );
                break;
            case "4":
                credentialManager.deleteCredentials(prompt("Inserisci il sito da eliminare:"));
                break;
            case "5": ;break;
            case "6":
                console.log("Arrivederci!");
                return;
            default:
                console.log("Scelta non valida.");
        }
    }
}

// Chiama la funzione main
main();
