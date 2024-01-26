const express = require("express");

let app = express();

app.get("/", (req, res) => {
  throw new Error("asaddwd");
})

app.use(function(err, req, res, next) {
  res.send(err.message);
})

app.listen(3000);
