"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const PORT = process.env.PORT || config.development.server.port;
const HOST = config.development.server.host;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//form
app.get("/", (req, res, next) => {
  res.send(`
    <h1>Hello World!</h1>
    <form action="/entry" method="post">
    <div>
    <label>Enter Your MSG</label>
    <input type ="text" name="msg">    
    <button type="submit">Enter Your Message</button>

    </div>
    </form>
    `);
});
//receiving request
app.post("/entry", (req, res, next) => {
  console.log(`${req.body.msg}`);
  res.send(req.body.msg);
});
//running server
app.listen(PORT, () => {
  console.log(`Server is running ${HOST}:${PORT}`);
});
