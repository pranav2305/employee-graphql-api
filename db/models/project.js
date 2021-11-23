const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    fromDate: String,
    toDate: String,
})

module.exports = mongoose.model("Project", projectSchema);