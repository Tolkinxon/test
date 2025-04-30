const express = require('express');
const path = require("path");
const { serverConfig } = require("./config.js");
const { PORT } = serverConfig;
const fs = require('fs/promises');
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null,'src/uploads');
    },
    filename: async function(req, file, cb){
        let filename = file.originalname;
        const files = await fs.readdir(path.join(process.cwd(), 'src', 'uploads'));
        let i = 0;
        while(files.some(item => item == filename)){
            if(filename.includes('(')){
                filename = filename.split('(')[0] + '(' + i + ')' + filename.split(')')[1];
            }
            else {filename = filename.split('.')[0] + '(' + i + ').'+filename.split('.')[1];}
            i++;
        }
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
    res.status(200).download(path.join(__dirname, 'uploads', fileName));
})

app.post('/register', async (req, res)=>{
    let newUser = req.body;
    console.log(newUser);
    
    let users = await fs.readFile(serverConfig.dbPath('users'), 'utf-8');
    users = users ? JSON.parse(users):[];
    
    if(users.some(item => item.email == newUser.email)) return res.json({message: 'this users already excist!'});
    newUser = {id: users.length ? users.at(-1).id + 1: 1, ...newUser};
    users.push(newUser);
    await fs.writeFile(serverConfig.dbPath('users'), JSON.stringify(users, null, 4));
    return res.status(200).json({message: 'user successfully added', status: 200});
})

app.post('/upload', upload.single('file'), async (req, res)=>{
    res.json({message: 'file yuklandi'});
})

app.listen(PORT, 'localhost', ()=>console.log(`Server running on port ${PORT}`));