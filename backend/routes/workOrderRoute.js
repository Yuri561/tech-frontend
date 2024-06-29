const express = require('express');
const router = express.Router();
const { getWorkOrders, createWorkOrder, deleteWorkOrder } = require('../controllers/workOrderController');
router.get('/workorders', getWorkOrders);
router.post('/workorders', createWorkOrder);
router.delete('/workorders/:id', deleteWorkOrder); // Ensure the route includes ':id'

module.exports = router;
