

import {
    
addMessage,
getAllMessage

 } from '../controllers/messagesController.js';
import express from 'express';

const router = express.Router();
// Update the server-side route to /addmsg
router.post("/addmsg", addMessage); // Changed from "/addMessage/" to "/addmsg/"
router.post("/getmsg", getAllMessage); // Assuming this route is correctly defined on the server




export default router;