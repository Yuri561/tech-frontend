const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeesSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true }, // Make username unique
	email: { type: String, required: true, unique: true }, // Add email field
	pin: { type: String, required: true },
	role: { type: String, required: true},
});

EmployeesSchema.pre('save', async function (next) {
	if (!this.isModified('pin')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.pin = await bcrypt.hash(this.pin, salt);
});

EmployeesSchema.methods.comparePin = async function (pin) {
	return await bcrypt.compare(pin, this.pin); // checking if entered pin matches the hash password
};

const EmployeeModel = mongoose.model('Employee', EmployeesSchema);
module.exports = EmployeeModel;
