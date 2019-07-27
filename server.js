"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const PORT = process.env.PORT || config.development.server.port;
const HOST = config.development.server.host;
const uuid = require("uuid/v1");
const cookieParser = require("cookie-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//form
app.get("/", (req, res, next) => {
  let token = uuid();
  res.cookie("token", token);
  res.send(`
    <h1>Hello World!</h1>
    <form action="/entry" method="post">
    <div>
    <label>Enter Your MSG</label>
    <input type ="text" name="msg">   
    <input type="hidden" value="${token}" name="_csrf"> 
    <button type="submit">Enter Your Message</button>
    </div>
    </form>
    `);
});
//receiving request
app.post("/entry", (req, res, next) => {
  if (req.cookies.token === req.body._csrf) {
    res.send(req.body.msg);
  } else {
    res.send("Unauthorized token");
  }
});
//running server
app.listen(PORT, () => {
  console.log(`Server is running ${HOST}:${PORT}`);
});
