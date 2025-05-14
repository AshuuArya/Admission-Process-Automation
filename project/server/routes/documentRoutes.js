import express from 'express';
import {
  uploadDocument,
  getDocumentById,
  deleteDocument,
  getMyDocuments,
} from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/upload').post(protect, upload.single('file'), uploadDocument);
router.route('/my-documents').get(protect, getMyDocuments);
router
  .route('/:id')
  .get(protect, getDocumentById)
  .delete(protect, deleteDocument);

export default router;