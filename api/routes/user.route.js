import express from 'express';
import {
  updateUser,
  test,
  deleteUser,
  getUserListing,
} from '../controllers/user.controler.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListing);

export default router;
