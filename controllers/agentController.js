import { contactUsResponseMsg } from '../utils/contact-us-response.js';
import { sendMail } from '../utils/send-mail.js';
import Agent from '../models/agentModel.js';


// Create new agent request

export const createAgent = async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, businessName, address, noPosReq, update } = req.body;

      const agentData = req.body
      const agent = new Agent({ firstName, lastName, email, phoneNumber, businessName, address, noPosReq, update });
      await agent.save();

// send response email to agent
try {
	const msgData = contactUsResponseMsg ({
	  firstName: agentData.firstName,
	});
   
	const emailSubject = "HuiosPay Agent Account Registration";
	await sendMail(
	  agentData.email,
	  emailSubject,
	  msgData.message,
	  msgData.attachment,
	  true
	);
  
  } catch (error) {
	console.log(error)
  }

  res.status(201).json({
	message: 'Agent Created Successfully, check your email for further guide.'
  });
} catch (error) {
  console.error('Error creating agent', error);
  res.status(500).json({ message: 'An error occurred while sending the message' });
}
};	  
 

   // Get agent by ID
export const getAgentById = async (req, res) => {
    try {
      const agentId = req.params.id;
      const agent = await Agent.findById(agentId);
      
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving agent by ID' });
    }
  };

  // Get all agents
export const getAllAgents = async (req, res) => {
    const allAgents = await Agent.find();

    if (!allAgents) {
      return res.status(400).json('Error retrieving Agents' );
    }
    res.status(200).json(allAgents, "All Agents retrieved successfully");
  };

// get agent by email
export const getAgentByEmail = async (req, res) => {
    const { email } = req.params;
    const agent = await Agent.find({ email: email });
  
    if (!agent) {
      throw new BadRequestError("Agent not found");
    }
  
    return res
      .status(200)
      .json({contact, message: "Agent retrieved successfully"});
  };
  
  // Update agent information
export const updateAgentInfo = async (req, res) => {
  try {
    const agentId = req.params.id;
    const updateData = req.body;

    // Find the agent by ID and update their information
    const updatedAgent = await Agent.findByIdAndUpdate(agentId, updateData, {
      new: true, // Return the updated agent object
    });

    if (!updatedAgent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.status(200)
    .json(returnMsg(updatedAgent, "Agent data updated successfully"));
    
  } catch (error) {
    res.status(500).json({ error: 'Error updating agent information' });
  }
};
  
  // delete contact
  export const deleteAgent = async (req, res) => {
    const { id } = req.params;
  
    const checkIfAgentExist = await Agent.find({ _id: id });
  
    if (!checkIfAgentExist) {
      throw new NotFoundError("Agent not found");
    }
  
    const deleteAgent = await Agent.findOneAndDelete({ _id: id });
  
    if (!deleteAgent) {
      throw new NotFoundError("Could not delete Agent");
    }
  
    res
      .status(200)
      .json(returnMsg(deleteContact, "Agent deleted successfully"));
  };
