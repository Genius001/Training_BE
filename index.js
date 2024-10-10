require('dotenv').config()
const path = require('path');
const express = require("express");
const http = require("http");
// const routes = require('./src/routes');
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const errorHandler = require("./src/middlewares/errorHandler");

require("./src/helpers/errors");

app.use(express.json());

app.use("/public", express.static(path.resolve(__dirname, "public")));

require("./src/routes")(app);

app.use((req, res) => {
    res.status(404).send("Sorry, page not found!");
})

app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});