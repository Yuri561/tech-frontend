const express = require('express');
const router = express.Router();
const {
  getEmployees,
  registerEmployee,
  loginEmployee,
} = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');

router.get('/employees', protect, getEmployees); // Protected route
router.post('/register', registerEmployee); // Public route
router.post('/login', loginEmployee); // Public route

module.exports = router;
