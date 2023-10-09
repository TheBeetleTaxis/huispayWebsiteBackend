import mongoose from 'mongoose';

// Merchant schema definition
const agentSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNumber: { type: String, required: true, unique: true },
		businessName: { type: String, required: true },
		address: { type: String, required: true },
		noPosReq: { type: Number },
		update: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
