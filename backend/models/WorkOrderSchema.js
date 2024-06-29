const mongoose = require('mongoose');


const WorkOrderSchema = new mongoose.Schema(
	{
		Id: { type: String, required: true, unique: true },
		Description: { type: String, required: true },
		Type: { type: String, required: true },
		NTE: { type: Number, required: true },
		Date: { type: Date, required: true }, // date format
		AssignedTo: { type: String, required: true },
		Status: { type: String, required: true },
		Priority: { type: Number, required: true },
		Location: { type: String, required: true },
		Notes: { type: String, required: false },
		rtuInformation: { type: String, required: false },
		maintenanceHistory: { type: String, required: false },
		PO: { type: Number, required: false },
	},
	{ timestamps: true }

);


const WorkOrderModel = mongoose.model('WorkOrder', WorkOrderSchema);



module.exports = WorkOrderModel;