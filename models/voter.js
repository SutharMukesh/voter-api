/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

const voter = new mongoose.Schema({
  electorname: {
    type: String,
    required: true
  },
  fathername: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  address: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model("voter", voter);
