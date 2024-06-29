const EmployeeModel = require('../models/Employees');
const generateToken = require('../utils/generateToken');

const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerEmployee = async (req, res) => {
  const { username, email, pin, role } = req.body;
  try {
    const userExists = await EmployeeModel.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await EmployeeModel.create({
      username,
      email,
      pin,
      role,
    });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const { username, pin } = req.body;
  if (!username || !pin) {
    return res.status(400).json({ message: 'Username and PIN are required' });
  }

  try {
    const user = await EmployeeModel.findOne({ username });
    if (user && (await user.comparePin(pin))) {
      generateToken(res, user.id);

      res.status(200).json({
        username: user.username,
		pin: user.pin,
      });
      console.log(`user: ${user}`);
    } else {
      res.status(401).json({ message: 'Invalid username or PIN' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmployees,
  registerEmployee,
  loginEmployee,
};
