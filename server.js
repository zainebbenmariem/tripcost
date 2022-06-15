const express = require("express");
const mongo = require("mongodb").MongoClient
const app = express();
app.use(express.json());
// DB CONNECTION 
const url = "mongodb+srv://trip_cost:tripcost2022@tripcost.p4xel.mongodb.net/?retryWrites=true&w=majority"
mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("tripcost")
  }
);

let db, trips, expenses
mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db("tripcost")
    trips = db.collection("trips")
    expenses = db.collection("expenses")
  }
);

// POST METHOD
app.post("/trip", (req, res) => {
    const name = req.body.name
    trips.insertOne({ name: name }, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      console.log(result)
      res.status(200).json({ ok: true })
    })
  })
  
app.post("/expense", (req, res) => {
    expenses.insertOne(
    {
      trip: req.body.trip,
      date: req.body.date,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
    },
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ ok: true })
    }
    )
    });

// GET METHOD

app.get("/trips", (req, res) => {
    trips.find().toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ trips: items })
    })
  });  

app.get("/expenses", (req, res) => {
    expenses.find({ trip: req.body.trip }).toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ expenses: items })
    })
  });

// SERVER LISTENING 
app.listen(8000, () => console.log("SERVER RUNNING"));