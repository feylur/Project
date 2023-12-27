const express = require('express');
const mongoose= require('mongoose');
const app = express();
const cors=require('cors');
mongoose.connect("mongodb://127.0.0.1:27017/Patients").then(() => console.log("Connection Success")).catch((err) => console.log(err, "Error Connection"));
const db = mongoose.connection;
app.use(express.json());
app.use(cors());
const Patients = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
  });
  
  const patients = mongoose.model('patients', Patients);
  
  app.listen(4000, () => console.log(`SERVER STARTED AT PORT: 4000`));
  
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
  
  app.get("/api/search", (req, res) => {
    res.send("API Search");
  });
  
  app.get("/api/patients", async (req, res) => {
    try {
      const allpatients = await patients.find();
      res.send(allpatients);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.get("/api/patients/:id", async (req, res) => {
    try {
      const user = await patients.findById(req.params.id);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.send(user);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.put("/api/patients/:id", async (req, res) => {
    try {
      const updatedUser = await patients.findByIdAndUpdate(
        req.params.id,
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          gender: req.body.gender,
        },
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).send('User not found');
      } else {
        res.send(updatedUser);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.delete("/api/patients/:id", async (req, res) => {
    try {
      const deletedUser = await patients.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).send('User not found');
      } else {
        res.send(deletedUser);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.post("/api/patients", async (req, res) => {
    try {
      const newUser = new patients({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
      });
      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });