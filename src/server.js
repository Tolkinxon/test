 const express = require("express");
 const { config } = require("dotenv");
 config();
 const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=> res.send('<h1>Hello world</h1>'));
app.post('/', (req, res) => {
    console.log(req.body);
    
    res.send('ishladi')
})


app.listen(PORT, "localhost", ()=>console.log(`Server running on port ${PORT}`));
