const WorkOrderModel = require('../models/WorkOrderSchema');

// API call to get all work orders assigned to a specific user
const getWorkOrders = async (req, res) => {
  try {
    // Extracting 'assignedTo' query parameter from the request
    const { assignedTo } = req.query;
    
    // Declare a variable to hold the work orders
    let workOrders;

    // Check if 'assignedTo' query parameter is provided
    if (assignedTo) {
      // Fetch work orders assigned to the specific user
      workOrders = await WorkOrderModel.find({ AssignedTo: assignedTo });
    } else {
      // Fetch all work orders
      workOrders = await WorkOrderModel.find();
    }

    // Send the work orders as a JSON response with a 200 status code
    res.status(200).json(workOrders);
  } catch (err) {
    // Log the error (optional, for debugging)
    console.error(err);

    // Send a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};



// API call to create a new work order
const createWorkOrder = async (req, res) => {
	const {
		Id,
		Description,
		Type,
		NTE,
		Date,
		AssignedTo,
		Status,
		Priority,
		Location,
		Notes,
		PO,
	} = req.body;
	try {
		const newWorkOrder = new WorkOrderModel({
			Id,
			Description,
			Type,
			NTE,
			Date,
			AssignedTo,
			Status,
			Priority,
			Location,
			Notes,
			PO,
		});

		await newWorkOrder.save();
		res.status(201).json(newWorkOrder);
	} catch (err) {
		console.error('Error creating work order:', err);
		res
			.status(500)
			.json({ error: 'Could not create work order', details: err.message });
	}
};

// API call to delete a work order
const deleteWorkOrder = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedWorkOrder = await WorkOrderModel.findByIdAndDelete(id);
		if (deletedWorkOrder) {
			res.status(200).json({ message: 'Work order deleted successfully' });
			console.log(`Work order with ID ${id} deleted successfully`);
		} else {
			res.status(404).json({ message: 'Work order not found' });
			console.log(`Work order with ID ${id} not found`);
		}
	} catch (err) {
		res
			.status(500)
			.json({ error: 'Could not delete work order', details: err.message });
	}
};
// API call to update a work order
const updateWorkOrder = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;
	try {
		const updatedWorkOrder = await WorkOrderModel.findByIdAndUpdate(
			id,
			updates,
			{ new: true }
		);
		res.status(200).json(updatedWorkOrder);
	} catch (err) {
		console.error('Error updating work order:', err);
		res
			.status(500)
			.json({ error: 'Could not update work order', details: err.message });
	}
};

module.exports = {
	getWorkOrders,
	createWorkOrder,
	updateWorkOrder,
	deleteWorkOrder,
};
