import asyncHandler from 'express-async-handler';
import Application from '../models/applicationModel.js';
import User from '../models/userModel.js';
import Document from '../models/documentModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Get all applications
// @route   GET /api/admin/applications
// @access  Private/Admin
const getAllApplications = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status;
  const search = req.query.search;

  // Build query
  let query = {};
  if (status) {
    query.status = status;
  }
  if (search) {
    query = {
      ...query,
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const count = await Application.countDocuments(query);
  const applications = await Application.find(query)
    .populate('user', 'name email')
    .populate('documents', 'name type isVerified')
    .sort({ updatedAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json({
    applications,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  });
});

// @desc    Get application by ID for admin
// @route   GET /api/admin/applications/:id
// @access  Private/Admin
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate('user', 'name email mobile')
    .populate('documents')
    .populate('statusHistory.updatedBy', 'name email');

  if (application) {
    res.json(application);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

// @desc    Update application status
// @route   PUT /api/admin/applications/:id
// @access  Private/Admin
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;

  const application = await Application.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (application) {
    application.status = status || application.status;
    application.statusHistory.push({
      status,
      remarks,
      updatedBy: req.user._id,
      date: Date.now(),
    });

    const updatedApplication = await application.save();

    // Send email notification
    const user = await User.findById(application.user);

    if (user) {
      const message = `
        <h1>Application Status Update</h1>
        <p>Dear ${user.name},</p>
        <p>Your application status has been updated to: <strong>${status}</strong></p>
        <p>Remarks: ${remarks || 'No additional remarks'}</p>
        <p>You can check more details on your dashboard.</p>
        <p>Thank you,<br/>ABES College Admissions Team</p>
      `;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Application Status Updated',
          message,
        });
      } catch (error) {
        console.error('Error sending email:', error);
        // Continue even if email fails
      }
    }

    res.json(updatedApplication);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
const getAllStudents = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search;

  // Build query
  let query = { isAdmin: false };
  if (search) {
    query = {
      ...query,
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const count = await User.countDocuments(query);
  const students = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json({
    students,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  });
});

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = asyncHandler(async (req, res) => {
  // Get application counts by status
  const statusCounts = await Application.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  // Get application counts by course preference
  const courseCounts = await Application.aggregate([
    { $unwind: '$coursePreferences' },
    {
      $group: {
        _id: '$coursePreferences.courseName',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Get monthly application submissions
  const monthlySubmissions = await Application.aggregate([
    {
      $match: {
        status: { $ne: 'draft' },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$updatedAt' },
          year: { $year: '$updatedAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Get total counts
  const totalApplications = await Application.countDocuments();
  const totalStudents = await User.countDocuments({ isAdmin: false });
  const totalDocuments = await Document.countDocuments();

  res.json({
    statusCounts,
    courseCounts,
    monthlySubmissions,
    totalApplications,
    totalStudents,
    totalDocuments,
  });
});

// @desc    Verify document
// @route   PUT /api/admin/documents/:id/verify
// @access  Private/Admin
const verifyDocument = asyncHandler(async (req, res) => {
  const { isVerified, remarks } = req.body;

  const document = await Document.findById(req.params.id);

  if (document) {
    document.isVerified = isVerified;
    document.verificationRemarks = remarks;

    const updatedDocument = await document.save();

    // Update application status if necessary
    if (document.application) {
      const application = await Application.findById(document.application);
      const allDocs = await Document.find({ application: document.application });
      
      // Check if all documents are verified
      const allVerified = allDocs.every(doc => doc.isVerified);
      
      if (application && allVerified && application.status === 'documents_pending') {
        application.status = 'under_review';
        application.statusHistory.push({
          status: 'under_review',
          remarks: 'All documents verified, application under review',
          updatedBy: req.user._id,
          date: Date.now(),
        });
        
        await application.save();
      }
    }

    res.json(updatedDocument);
  } else {
    res.status(404);
    throw new Error('Document not found');
  }
});

export {
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  getAllStudents,
  getAnalytics,
  verifyDocument,
};