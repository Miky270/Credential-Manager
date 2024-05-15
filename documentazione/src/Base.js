/**
 * @author Scarale Matteo, Renato Bisceglia, Michele Pio Puzzolante.
 */

const prompt = require('prompt-sync')();

//Mappa per le credenziali
const credentials = new Map();

/**
*Classe per le Credenziali
    *Creare un nuovo ogetto Credenziale
    *@typedef {Object} OgettoCredenziali
    *@param {string} site - Il nome del sito .
    *@param {string} username - l'Username .
    *@param {string} password - la password .
    *@param {string} notes - le note .
    *@param {string} date - la data.
*/

/**
* @class per gestire le credenziali
*/

class Credential {
    /**
    * Aggiunta delle Credenziali al Gestore delle Credenziali
    *@constructs
    *@param {string} site - Il nome del sito .
    *@param {string} username - l'Username .
    *@param {string} password - la password .
    *@param {string} notes - le note .
    */

    constructor(site, username, password, notes) {
        this.site = site;
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.date = new Date().toLocaleString();
    }
}

class CredentialManager {
    /**
    * @constructor
    * Crea nuovo gestore di credenziali
    **/
constructor() {
        this.lista = new Map(); //mappa per la memorizzazione delle credenziali
    }

    /**
    * Aggiunge le Credenziali al Gestore delle Credenziali
    * @function
    * @param {string} site - Il nome del sito .
    * @param {string} username - l'Username .
    * @param {string} password - la password .
    * @param {string} notes - le note .
    */
    addCredentials(site, username, password, notes) {
        const credential = new Credential(site, username, password, notes);
        this.lista.set(site, credential);
    }

    /**
     * @function
     * @param {string} searchTerm - Il Termine di ricerca
     * @returns {Array<CredentialObject>} - Un array contenente le credenziali
     */
    searchCredentials(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        const searchResults = [];
        this.lista.forEach(credential => {
            if (credential.site.toLowerCase().includes(searchTerm)) {
                searchResults.push(credential);
            }
        });
        console.log(searchResults);
    }

    /**
    *Modfifica delle Credenziali nel gestore delle Credenziali
    * @function
    * @param {string} site - Il nome del sito .
    * @param {string} username - l'Username .
    * @param {string} password - la password .
    * @param {string} note - le note .
    */
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
    /**
    *Eliminazione delle Credenziali nel Gestore di credenziali
    * @function
    * @param {string} site - Il Nome del sito
    */

    deleteCredentials(site) {
        if (this.lista.has(site)) {
            this.lista.delete(site);
        } else {
            console.log("Credenziali non trovate per il sito:", site);
        }
    }

    /**
     * Stampa le credenziali
     * @function
     */
    printCredentials() {
        console.log("\nElenco delle credenziali:");
        this.lista.forEach(credential => {
            console.log("Sito:", credential.site);
            console.log("Username:", credential.username);
            console.log("Password:", credential.password);
            console.log("Note:", credential.notes);
            console.log("Data:", credential.date);
            console.log("-------------------------");
        });
    }
}

/**
*Funzione principale per gestire le credenziali
* @function
*/

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
            case "2": 
                credentialManager.searchCredentials(
                    (prompt("Inserisci il nome del sito:"))
                );      
                break;
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
            case "5": 
                credentialManager.printCredentials();
                break;
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
