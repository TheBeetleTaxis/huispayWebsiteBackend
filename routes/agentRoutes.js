import express from 'express';
import { createAgent, getAgentByEmail, getAgentById, getAllAgents, deleteAgent, updateAgentInfo } from '../controllers/agentController.js';


const router = express.Router();

// @desc    Route for creating agent
// @access  Public


// create Agent
router.post('/', createAgent )


// get agent by Id
router.get('/:id', getAgentById )

// get all agent by email
router.get('/:email', getAgentByEmail )


// get all agents
router.get('/get-all-agents', getAllAgents )

// Route to update agent information by ID
router.put('/update-agent/:id', updateAgentInfo);

// delete agent
router.delete('/delete-agent', deleteAgent )

export default router;
