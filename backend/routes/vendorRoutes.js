import express from 'express';
import { getAllVendors, getVendorById } from '../controllers/vendorController.js';

const router = express.Router();

// GET /api/vendors?search=&category=&city=
router.get('/', getAllVendors);

// GET /api/vendors/:id
router.get('/:id', getVendorById);

export default router;
