const express = require('express');
const { serverConfig } = require("./config.js");
const { PORT } = serverConfig;
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(morgan('dev'))

app.get('/animals', (req, res)=> {
    res.send('there is a response for req /animals')
});


app.use('/animals2', (req, res, next)=>{
    res.json({error: `Severda  xatolik kuzatildi`})
})



app.listen(PORT, 'localhost', ()=>console.log(`Server running on port ${PORT}`));