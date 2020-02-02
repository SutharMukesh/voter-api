/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const express = require("express");
const Voter = require("../models/voter");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var multer = require("multer");
const fs = require('fs')
const voterroute = express.Router();

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "uploads/");
  }
});

const upload = multer({ storage: storage });

// Get All voter details for homepage
voterroute.get("/:id", async (req, res) => {
  try {
    logger.info(`Voter/: Get voter ${req.params.id}`);
    let voters = await Voter.findOne({ _id: req.params.id });
    res.status(200).send(voters);
  } catch (error) {
    logger.error(`Voter/: Error while finding voters: ${error.stack ? error.stack : error}`);
    res.status(400).send({ message: `Error while finding voters: ${error}` });
  }
});

// Add new Voter
voterroute.post("/addimage", upload.single("file"), async (req, res) => {
  try {
    logger.info(`Voter/add: Adding Voter ${JSON.stringify(req.body)}`);
    let voter = new Voter();
    voter.photo.data = fs.readFileSync(req.file.path);
    voter.photo.contentType = "image/png";
    voter = Object.assign(voter, req.body);
    result = await voter.save();
    res.status(200).send({ message: "Added Voter successfully" });
  } catch (error) {
    logger.error(`Voter/add: Error while inserting Voter: ${error.stack ? error.stack : error}`);
    res.status(401).send({ message: `Error while inserting Voter: ${error}` });
  }
});

// // Edit a voter
// voterroute.post('/update/:id', async (req, res) => {
//   try {
//     console.log(req.params.id)
//       logger.info(`Voter/update: Updating Voter ${JSON.stringify(req.body)}`);
//       await Voter.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
//       res.status(200).send({message:'Voter details updated'});
//   } catch (error) {
//     logger.error(`Voter/update: Error while updating Voter: ${((error.stack) ? error.stack : error)}`);
//     res.status(400).send({message:`Error while updating voter: ${error}`});
//   }
// });

// // Delete a voter
// voterroute.delete('/:id', async (req, res) => {
//   // Only Supervisor can delete a product
//   try {
//       logger.info(`Voter/delete: Deleting Voter id: ${req.params.id}`);
//       result = await Voter.deleteOne({ _id: req.params.id });
//       res.status(200).send({message:`delete voter details: ${JSON.stringify(result)}`});
//   } catch (error) {
//     logger.error(`Voter/delete: Error while deleting voter: ${((error.stack) ? error.stack : error)}`);
//     res.status(400).send({message:`Error while deleting: ${error}`});
//   }
// });

module.exports = voterroute;
