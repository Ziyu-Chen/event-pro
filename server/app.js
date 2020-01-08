const express = require("express")
const { getUser, createUser } = require("./model")
const path = require("path")
const app = express()
const bodyParser = require('body-parser');
const atob = require("atob")

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});



app.use(express.static(path.join(__dirname, "..", 'build')));




app.use(bodyParser.json());

app.get("/api", async (req, res) => {
  try {
    res.send("Hi!").status(200);
  } catch(e) {
    res.sendStaus(500);
  }
})


app.get("/api/users", async (req, res) => {
  try {
    const [email, password] = atob(req.headers.authorization.slice(6)).split(":")
    console.log(req.headers.authorization);
    const response = await getUser(email, password);
    if (response.length === 1) {
      const user = response[0];
      res.json(user).status(200);
    } else {
      res.sendStatus(401)
    }
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
})

app.post("/api/users", async (req, res) => {
  try {
    const user = req.body;
    const response = await createUser(user);
    const createdUser = response[0];
    if (createdUser.email === user.email) {
      res.sendStatus(201)
    } else {
      console.log("there's something wrong!")
    } 
  } catch(err) {
    console.log(err)
    if (err.constraint === "users_email_unique") {
      res.sendStatus(409)
    } else {
      res.sendStatus(500)
    }
    
  }
})


module.exports = app