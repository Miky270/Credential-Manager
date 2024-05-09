const prompt=require('prompt-sync')();

const credentials = new Map();

class Credential {
    constructor(site, username, password, notes) {
        this.site = site;
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.date = new Date().toLocaleString();
    }
}

function addCredentials(site, username, password, notes) {
    const credential = new Credential(site, username, password, notes);
    credentials.set(site, credential);
}

function main() {
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
                addCredentials(
                                prompt("Inserisci il sito:"),
                                prompt("Inserisci lo username:"), 
                                prompt("Inserisci la password:"), 
                                prompt("Inserisci le note:")
                            );
                break;
            case "2": ;break;
            case "3": ;break;
            case "4": ;break;
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
