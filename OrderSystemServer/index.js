const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8081;
const cors = require("cors");
const dataSchema = require("./dataModel");
const jsonData = require("./src/foodList");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());

//Get Method to send json
app.get("/foodList", function (req, res) {
  const chunk = jsonData.slice(0, 20);
  res.json(chunk);
});

const URI = "mongodb://127.0.0.1:27017/restro";

//Post Method to insert into db
app.post("/foodList1", async (req, res) => {
  const data1 = req.body;
  const client = new MongoClient(URI);
  const database = client.db("restro");
  const collection = database.collection("restros");
  collection.insertMany(data1);
  console.log("Catch Error");
});

//Get Method to fetch from database
app.get("/fetchFromDataBase", async (req, res) => {
  const URI = "mongodb://127.0.0.1:27017/restro";
  const client = new MongoClient(URI);
  const database = client.db("restro");
  const collection = database.collection("restros");
  if (collection == []) {
    console.log("Database Is Empty");
  } else {
    const respond = await collection.find({}).toArray();
    const respond1 = respond.map((item) => ({
      _id: item._id,
      id: item.id,
      name: item.name,
      quantity: item.quantity,
    }));
    res.json(respond1);
  }
});

//Post method to delete
app.post("/deleteFromDB", async (req, res) => {
  const data1 = req.body;
  const client = new MongoClient(URI);
  const database = client.db("restro");
  const collection = database.collection("restros");
  if (data1.quantity > 1) {
    collection.updateOne(
      { id: data1.id },
      { $set: { quantity: data1.quantity - 1 } }
    );
  } else {
    collection.findOneAndDelete({ id: data1.id }, function (err, docs) {
      console.log(docs);
    });
  }
});

//Post method for Validating User
app.post("/validationForLogin", async (req, res) => {
  const data1 = req.body;
  console.log(data1);
  const URI = "mongodb://127.0.0.1:27017/validate";
  const client = new MongoClient(URI);
  const database = client.db("validate");
  const collection = database.collection("user");
  try {
    const emailResponse = await collection.findOne({ email: data1.email });
    if (emailResponse) {
      const passResponse = await collection.findOne({
        password: data1.password,
      });
      if (passResponse) {
        const respond = await collection.findOne({ email: data1.email });
        res.send(respond);
      } else {
        console.log("Incorrect Password");
      }
    } else {
      console.log("Invalid user");
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
});
//Listening Port
app.listen(PORT, function () {
  console.log(`Listening in port ${PORT}`);
});
