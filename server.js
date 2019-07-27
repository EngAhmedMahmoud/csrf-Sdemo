"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const PORT = process.env.PORT || config.development.server.port;
const HOST = config.development.server.host;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
//running server
app.listen(PORT, () => {
  console.log(`Server is running ${HOST}:${PORT}`);
});
