 const express = require("express");
 const { config } = require("dotenv");
 config();
 const PORT = process.env.PORT || 4000;

const app = express();


app.listen(PORT, "localhost", ()=>console.log(`Server running on port ${PORT}`));
