const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    from_date: String,
    to_date: String,
})

module.exports = mongoose.model("Project", projectSchema);