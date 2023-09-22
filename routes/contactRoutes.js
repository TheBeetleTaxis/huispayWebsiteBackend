import express from 'express';

// import sendEmail from '../middleware/emailMiddleware.js';
import { contactUs, getContactByEmail, getContactByTicketId, deleteContact, getAllContact } from '../controllers/contactController.js';



const router = express.Router();

// @desc    Route for contact us
// @route   POST /api/contact-us
// @access  Public
router.post(
	'/',
	contactUs,
	
);

router.get(
	"/get-contact-by-email/:email",
	getContactByEmail,
	);
	
	router.get(
	"/get-contact-by-ticketId/:Id",
	getContactByTicketId,
	);
	
	router.get(
	"/get-all-contact",
	(getAllContact)
	);

	router.delete(
	"/delete-contact/:id",
	deleteContact
	);
		

export default router;