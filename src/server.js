const express = require('express');
const path = require("path");
const { serverConfig } = require("./config.js");
const { PORT } = serverConfig;
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null,'src/uploads');
    },
    filename: function(req, file, cb){
        const filename = file.originalname ;
        cb(null, filename);
    }  

})

const upload = multer({storage});

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/image', express.static(path.join(__dirname, 'uploads'))); 

app.get("/download/:fileName", (req, res)=>{
    const fileName = req.params.fileName;
    console.log(path.join(__dirname, 'uploads', fileName));
    
    res.status(200).download(path.join(__dirname, 'uploads', fileName));
})

app.post('/upload', upload.single('file'), (req, res)=>{
    console.log(req.file);
    
    res.json({message: 'file yuklandi'});
})



app.listen(PORT, 'localhost', ()=>console.log(`Server running on port ${PORT}`));