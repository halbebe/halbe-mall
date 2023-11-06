const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    // unique: true
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    // default: Date.now,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }

});


module.exports = mongoose.model("Products", productsSchema);