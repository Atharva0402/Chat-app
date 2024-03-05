// const { register } = require("../controllers/userController");/
// import Register from '../../public/src/pages/Register.js';
// import Register from '../../public/src/pages/Register.jsx';
import { getAllUsers, register, setAvatar } from '../controllers/userController.js';
import express from 'express';
import { login } from '../controllers/userController.js';

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);



export default router;