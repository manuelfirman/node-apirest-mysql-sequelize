const express = require("express");
const bodyParser = require("body-parser");

// import router
const apiRouter = require("./routes/api");

// app de expres
const app = express();

// DB conection
require("./db");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 3000;

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});