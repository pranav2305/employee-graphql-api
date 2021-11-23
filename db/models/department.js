const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: String,
    projectIDs: [String]
})

module.exports = mongoose.model("Department", departmentSchema);