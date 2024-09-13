import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// ----- ROUTES -----
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get/', getListings); // => search route

export default router;
