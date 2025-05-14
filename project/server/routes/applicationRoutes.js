import express from 'express';
import {
  createApplication,
  getApplicationById,
  updateApplication,
  getMyApplications,
  submitApplication,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/application').post(protect, createApplication);
router.route('/applications').get(protect, getMyApplications);
router.route('/application/:id/submit').put(protect, submitApplication);
router
  .route('/application/:id')
  .get(protect, getApplicationById)
  .put(protect, updateApplication);

export default router;