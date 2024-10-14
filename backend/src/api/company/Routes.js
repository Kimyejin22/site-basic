import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from './Controller.js';

const router = express.Router();

// Get all companies
router.get('/', getAllCompanies);

// Get a single company by ID
router.get('/:id', getCompanyById);

// Create a new company
router.post('/', createCompany);

// Update an existing company
router.put('/:id', updateCompany);

// Delete a company
router.delete('/:id', deleteCompany);

export default router;