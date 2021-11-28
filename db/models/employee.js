const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: mongoose.Schema.Types.ObjectId,
    salary: Number,
    from_date: String,
    to_date: String,
    projects: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("Employee", employeeSchema);
