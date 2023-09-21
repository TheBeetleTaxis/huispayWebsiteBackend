import Contact from '../models/contactModel.js';
import { getUniqueId } from '../utils/validators/unique-id.js';
import { contactUsResponseMsg } from '../utils/contact-us-response.js';
import { sendMail } from '../utils/send-mail.js';

export const contactUs = async (req, res) => {
  try {
    const ticketId = await getUniqueId() 
    req.body.ticketId = ticketId
    const contactData = req.body
    

    const isExist = await Contact.findOne({_id:
      ticketId
    })

    if (isExist) {
      throw new ConflictError("Ticket already exist");
    }


    const newTicket = await Contact.create(contactData)

    // send response email to user
    try {
      const msgData = contactUsResponseMsg ({
        firstName: contactData.firstName,
      });
     
      const emailSubject = "Thank you for contacting us";
      await sendMail(
        contactData.email,
        emailSubject,
        msgData.message,
        msgData.attachment
      );
    
    } catch (error) {
      console.log(error)
    }

    res.status(201).json({
      message: 'Message sent successfully, one of our representatives will contact you shortly!!'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'An error occurred while sending the message' });
  }
};


// function to get contact by email
export const getContactByEmail = async (req, res) => {
  const { email } = req.params;
  const contact = await Contact.find({ email: email });

  if (!contact) {
    throw new BadRequestError("Contact not found");
  }

  return res
    .status(200)
    .json({contact, message: "Contact retrieved successfully"});
};

// get by ticket ID
export const getContactByTicketId = async (req, res) => {
  const { ticketId } = req.params;
  const contact = await Contact.find({ ticketId: ticketId });

  if (!ticketId) {
    console.error("TicketID not found");
  }

  return res
    .status(200)
    .json({ticketId, contact, message: "TicketID retrieved successfully"});
};

// delete contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const checkIfContactExist = await Contact.find({ _id: id });

  if (!checkIfContactExist) {
    throw new NotFoundError("Contact not found");
  }

  const deleteContact = await Contact.findOneAndDelete({ _id: id });

  if (!deleteContact) {
    throw new NotFoundError("Could not delete Contact");
  }

  res
    .status(200)
    .json(returnMsg(deleteContact, "Contact deleted successfully"));
};


// get all contact

export const getAllContact = async (req, res) => {
  const allContact = await Contact.find();

  if (!allContact) {
    throw new NotFoundError("No contact was found");
  }

  res
    .status(200)
    .json({allContact, message: "All contact retrieved successfully"});
};


