const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from file
const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
};

// Helper function to write users to file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    if (users.find(user => user.email === email)) {
        return res.json({ success: false, message: 'Email already registered' });
    }
    
    users.push({ email, password });
    writeUsers(users);
    
    res.json({ success: true });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});

app.post('/forgot', (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    
    const user = users.find(user => user.email === email);
    
    if (user) {
        // Implement email sending logic here
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Email not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
