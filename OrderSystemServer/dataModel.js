const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
});

module.exports = dataSchema;
