import express from 'express';
import {
  updateUser,
  test,
  deleteUser,
  getUserListing,
  getUser,
} from '../controllers/user.controler.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// ----- ROUTES -----
router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListing);
router.get('/:id', verifyToken, getUser);

export default router;
