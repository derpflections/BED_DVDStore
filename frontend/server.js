const express = require("express");
const serveStatic = require("serve-static");

var hostname = "localhost";
var port = 3001;

var app = express();

app.use(function (req, res, next) {
  if (req.method != "GET") {
    res.type(".html");
    var msg =
      "<html><body>This server only serves web pages with GET!</body></html>";
    res.end(msg);
  } else {
    next();
  }
});

app.use(serveStatic(__dirname + "/public"));

app.get("/actor", (req, res) => {
  res.sendFile("/public/html/actor.html", { root: __dirname });
});

app.get("/film", (req, res) => {
  res.sendFile("/public/html/film.html", { root: __dirname });
})

app.get("/login", (req, res) => {
  res.sendFile("/public/html/login.html", { root: __dirname });
})

app.get("/", (req, res) => {
  res.sendFile("/public/html/index.html", { root: __dirname });
})

app.get("/2223010", (req, res) => {
  res.sendFile("/public/html/test.html", { root: __dirname });
})

app.listen(port, hostname, () => {
  console.log(`Server hosted at http://${hostname}:${port}`);
});