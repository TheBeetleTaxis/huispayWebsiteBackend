import mongoose from 'mongoose';

// Merchant schema definition
const merchantSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNumber: { type: String, required: true, unique: true },
		businessName: { type: String, required: true },
		website: { type: String },
		size: { type: Number },
		product: { type: String },
		country: { type: String, required: true },
		payment: { type: Number },
		noPosReq: { type: Number },
		description: { type: String },
		update: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Merchant = mongoose.model('Merchant', merchantSchema);

export default Merchant;
