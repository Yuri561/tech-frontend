const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const EmployeeModel = require('./Models/Employees');

mongoose.connect('mongodb+srv://yui561:Houbenove561%24@cluster0.c3jn9rd.mongodb.net/CompanyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected');

  const employees = await EmployeeModel.find();

  for (const employee of employees) {
    // Check if the pin is not already hashed (assuming a hashed pin starts with $2a$)
    if (!employee.pin.startsWith('$2a$')) {
      console.log(`Hashing pin for user: ${employee.username}`);
      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(employee.pin, salt);
      employee.pin = hashedPin;

      // Validate and convert _id to ObjectId if necessary
      if (typeof employee._id === 'string') {
        employee._id = mongoose.Types.ObjectId(employee._id);
      }

      await employee.save().catch(err => {
        console.error(`Error updating pin for user ${employee.username}:`, err);
      });
      console.log(`Updated pin for user: ${employee.username}`);
    }
  }

  console.log('All pins updated');
  mongoose.connection.close();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
