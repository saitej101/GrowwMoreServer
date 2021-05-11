const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static("images"));

app.post("/login", (req, res) => {
  console.log("request", req.body);
  var userDetails = req.body;
  const dataPath = "./data/users.json";

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    console.log("File data", JSON.parse(data));
    var userList = JSON.parse(data);
    var user = userList.find((user) => user.username == userDetails.username);
    console.log("request", user);

    if (user) {
      if (user.password == userDetails.password) {
        res.json({
          ReturnCode: 200,
          ReturnMessage: "Authenticate user",
          data: user,
        });
      } else {
        res.json({
          ReturnCode: 401,
          ReturnMessage: "Your username or password is incorrect",
        });
      }
    } else {
      res.json({
        ReturnCode: 401,
        ReturnMessage: "Your username or password is incorrect",
      });
    }
  });
});

app.post("/register", (req, res) => {
  console.log("register request", req.body);
  const dataPath = "./data/users.json";

  var userDetails = req.body;
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("File data", JSON.parse(data));
    var userList = JSON.parse(data);
    var user = userList.find((user) => user.username == userDetails.username);
    console.log("request", user);

    if (user) {
      res.json({ ReturnCode: 401, ReturnMessage: "User already registered." });
    } else {
      userList.push(userDetails);

      fs.writeFile(dataPath, JSON.stringify(userList), "utf8", (err) => {
        if (err) {
          throw err;
        }

        res.json({
          ReturnCode: 200,
          ReturnMessage: "User successfully registered.",
        });
      });
    }
  });
});

app.get("/stockDetails", (req, res) => {
  console.log("In stockdetails");
  const dataPath = "./data/stockDetails.json";
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(JSON.parse(data));

    res.json({ ReturnCode: 200, Data: JSON.parse(data) });
  });
});

app.get("/mfDetails", (req, res) => {
  console.log("In mfDetails");
  const dataPath = "./data/mfDetails.json";
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(JSON.parse(data));

    res.json({ ReturnCode: 200, Data: JSON.parse(data) });
  });
});

app.get("/goldDetails", (req, res) => {
  console.log("In goldDetails");
  const dataPath = "./data/goldDetails.json";
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    console.log(JSON.parse(data));

    res.json({ ReturnCode: 200, Data: JSON.parse(data) });
  });
});

app.listen(port, "192.168.1.101", () => {
  console.log(`App listening at http://192.168.1.101:${port}`);
});
