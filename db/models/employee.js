const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    departmentID: mongoose.Schema.Types.ObjectId,
    salary: Number,
    projectIDs: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("Emplyee", employeeSchema);
