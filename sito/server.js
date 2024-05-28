const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersFilePath = path.join(__dirname, 'users.json');
const credentialsFilePath = path.join(__dirname, 'credentials.json');

/**
 * Funzione helper per leggere gli utenti dal file.
 * @returns {Array} Array di oggetti utente.
 */
const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
};

/**
 * Funzione helper per scrivere gli utenti nel file.
 * @param {Array} users - Array di oggetti utente.
 */
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

/**
 * Funzione helper per leggere le credenziali dal file.
 * @returns {Array} Array di oggetti credenziali.
 */
const readCredentials = () => {
    if (!fs.existsSync(credentialsFilePath)) {
        return [];
    }
    const data = fs.readFileSync(credentialsFilePath, 'utf8');
    return JSON.parse(data);
};

/**
 * Funzione helper per scrivere le credenziali nel file.
 * @param {Array} credentials - Array di oggetti credenziali.
 */
const writeCredentials = (credentials) => {
    fs.writeFileSync(credentialsFilePath, JSON.stringify(credentials, null, 2));
};

/**
 * Registra un nuovo utente.
 * @name POST /register
 * @function
 * @param {Object} req - Oggetto richiesta di Express.
 * @param {Object} res - Oggetto risposta di Express.
 */
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    if (users.find(user => user.email === email)) {
        return res.json({ success: false, message: 'Email già registrata' });
    }
    
    users.push({ email, password });
    writeUsers(users);
    
    res.json({ success: true });
});

/**
 * Effettua il login di un utente.
 * @name POST /login
 * @function
 * @param {Object} req - Oggetto richiesta di Express.
 * @param {Object} res - Oggetto risposta di Express.
 */
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Email o password non validi' });
    }
});

/**
 * Gestisce la richiesta di password dimenticata.
 * @name POST /forgot
 * @function
 * @param {Object} req - Oggetto richiesta di Express.
 * @param {Object} res - Oggetto risposta di Express.
 */
app.post('/forgot', (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    
    const user = users.find(user => user.email === email);
    
    if (user) {
        // Implementare la logica di invio email qui
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Email non trovata' });
    }
});

/**
 * Salva le credenziali.
 * @name POST /credentials
 * @function
 * @memberof module:routes/credentials
 * @param {Object} req - Oggetto richiesta di Express.
 * @param {Object} res - Oggetto risposta di Express.
 */
app.post('/credentials', (req, res) => {
    const credentials = req.body;
    writeCredentials(credentials);
    res.json({ success: true });
});

/**
 * Recupera le credenziali.
 * @name GET /credentials
 * @function
 * @param {Object} req - Oggetto richiesta di Express.
 * @param {Object} res - Oggetto risposta di Express.
 */
app.get('/credentials', (req, res) => {
    const credentials = readCredentials();
    res.json(credentials);
});

/**
 * Avvia il server.
 * @name listen
 * @function
 * @param {number} port - Il numero di porta su cui il server ascolta.
 */
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
