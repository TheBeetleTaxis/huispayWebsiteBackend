import { contactUsResponseMsg } from '../utils/contact-us-response.js';
import { sendMail } from '../utils/send-mail.js';
import Merchant from '../models/merchantModel.js';
import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';


// Create a new Merchant
export const createMerchant = asyncHandler(async (req, res, next) => {
    try {
      const { firstName, lastName, email, phoneNumber, businessName, website, size, product, country, payment,noPosReq, description, update } = req.body;

      const merchantData = req.body
      const merchant = new Merchant({ firstName, lastName, email, phoneNumber, businessName, website, size, product, country, payment, noPosReq, description, update });
      await merchant.save();

// send response email to user
try {
  const error = validationResult(req);
	const msgData = contactUsResponseMsg ({
	  firstName: merchantData.firstName,
	});
   
	const emailSubject = "HuiosPay Merchant Account Registration";
	await sendMail(
	  merchantData.email,
	  emailSubject,
	  msgData.message,
	  msgData.attachment,
	  true
	);

  } catch (error) {
	console.log(error)
  }
 
  res.status(201).json({
	message: 'Merchant Created Successfully, check your email for further guide.'
  });
} catch (error) {
  console.error('Error creating merchant', error);
  res.status(500).json({ message: 'An error occurred while sending the message' });
}
});	  
 

   // Get merchant by ID
export const getMerchantById = async (req, res) => {
    try {
      const merchantId = req.params.id;
      const merchant = await Merchant.findById(merchantId);
      
      if (!merchant) {
        return res.status(404).json({ error: 'Merchant not found' });
      }
      
      res.status(200).json(merchant);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving merchant by ID' });
    }
  };

  // Get all testimonials
export const getAllMerchants = async (req, res) => {
    try {
      const merchant = await Merchant.find();
      res.status(200).json(merchant);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving Merchants' });
    }
  };

