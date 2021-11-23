const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    fromDate: Date,
    toDate: Date,
})

module.exports = mongoose.model("Project", projectSchema);