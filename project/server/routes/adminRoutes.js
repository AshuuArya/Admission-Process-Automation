import express from 'express';
import {
  getAllApplications,
  updateApplicationStatus,
  getAllStudents,
  getAnalytics,
  getApplicationById,
  verifyDocument,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/applications').get(protect, admin, getAllApplications);
router
  .route('/applications/:id')
  .get(protect, admin, getApplicationById)
  .put(protect, admin, updateApplicationStatus);
router.route('/students').get(protect, admin, getAllStudents);
router.route('/analytics').get(protect, admin, getAnalytics);
router.route('/documents/:id/verify').put(protect, admin, verifyDocument);

export default router;