import asyncHandler from 'express-async-handler';
import Document from '../models/documentModel.js';
import Application from '../models/applicationModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Upload a document
// @route   POST /api/documents/upload
// @access  Private
const uploadDocument = asyncHandler(async (req, res) => {
  const { applicationId, documentType, documentName } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Create document
  const document = new Document({
    user: req.user._id,
    application: applicationId,
    name: documentName || req.file.originalname,
    type: documentType,
    path: req.file.path,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });

  const createdDocument = await document.save();

  // Update application with document reference
  if (applicationId) {
    await Application.findByIdAndUpdate(
      applicationId,
      {
        $push: { documents: createdDocument._id },
      },
      { new: true }
    );
  }

  res.status(201).json(createdDocument);
});

// @desc    Get document by ID
// @route   GET /api/documents/:id
// @access  Private
const getDocumentById = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (document) {
    // Check if the user is the owner of the document
    if (document.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to access this document');
    }

    res.json(document);
  } else {
    res.status(404);
    throw new Error('Document not found');
  }
});

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (document) {
    // Check if the user is the owner of the document
    if (document.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to delete this document');
    }

    // Remove document reference from application
    if (document.application) {
      await Application.findByIdAndUpdate(
        document.application,
        {
          $pull: { documents: document._id },
        },
        { new: true }
      );
    }

    // Delete file from filesystem
    if (document.path && fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    await document.deleteOne();

    res.json({ message: 'Document removed' });
  } else {
    res.status(404);
    throw new Error('Document not found');
  }
});

// @desc    Get all documents for a user
// @route   GET /api/documents/my-documents
// @access  Private
const getMyDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user._id }).sort({
    uploadDate: -1,
  });

  res.json(documents);
});

export { uploadDocument, getDocumentById, deleteDocument, getMyDocuments };