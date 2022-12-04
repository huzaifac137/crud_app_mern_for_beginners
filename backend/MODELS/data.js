const mongoose = require("mongoose");

const schema = mongoose.Schema;

const dataSchema = new schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model("data", dataSchema);
