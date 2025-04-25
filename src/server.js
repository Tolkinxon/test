const express = require('express');
const { serverConfig } = require("./config.js");
const { PORT } = serverConfig;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.get('/animals', (req, res)=> res.send('there is a response for req /animals'));





app.listen(PORT, 'localhost', ()=>console.log(`Server running on port ${PORT}`));