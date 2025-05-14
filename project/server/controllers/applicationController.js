import asyncHandler from 'express-async-handler';
import Application from '../models/applicationModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create a new application
// @route   POST /api/students/application
// @access  Private
const createApplication = asyncHandler(async (req, res) => {
  const {
    name,
    dateOfBirth,
    gender,
    category,
    fatherName,
    motherName,
    address,
    contactNumber,
    email,
    academicDetails,
    coursePreferences,
  } = req.body;

  const application = new Application({
    user: req.user._id,
    name,
    dateOfBirth,
    gender,
    category,
    fatherName,
    motherName,
    address,
    contactNumber,
    email,
    academicDetails,
    coursePreferences,
    status: 'draft',
    statusHistory: [
      {
        status: 'draft',
        remarks: 'Application created',
        updatedBy: req.user._id,
      },
    ],
  });

  const createdApplication = await application.save();

  res.status(201).json(createdApplication);
});

// @desc    Get application by ID
// @route   GET /api/students/application/:id
// @access  Private
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate('documents')
    .populate('statusHistory.updatedBy', 'name email');

  if (application) {
    // Check if the user is the owner of the application
    if (application.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('Not authorized to access this application');
    }

    res.json(application);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

// @desc    Update application
// @route   PUT /api/students/application/:id
// @access  Private
const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    // Check if the user is the owner of the application
    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this application');
    }

    // Check if application is in a draft state
    if (application.status !== 'draft') {
      res.status(400);
      throw new Error('Application cannot be updated after submission');
    }

    const {
      name,
      dateOfBirth,
      gender,
      category,
      fatherName,
      motherName,
      address,
      contactNumber,
      email,
      academicDetails,
      coursePreferences,
    } = req.body;

    application.name = name || application.name;
    application.dateOfBirth = dateOfBirth || application.dateOfBirth;
    application.gender = gender || application.gender;
    application.category = category || application.category;
    application.fatherName = fatherName || application.fatherName;
    application.motherName = motherName || application.motherName;
    application.address = address || application.address;
    application.contactNumber = contactNumber || application.contactNumber;
    application.email = email || application.email;
    application.academicDetails = academicDetails || application.academicDetails;
    application.coursePreferences = coursePreferences || application.coursePreferences;

    const updatedApplication = await application.save();

    res.json(updatedApplication);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

// @desc    Get all applications for a student
// @route   GET /api/students/applications
// @access  Private
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ user: req.user._id })
    .populate('documents', 'name type isVerified')
    .sort({ createdAt: -1 });

  res.json(applications);
});

// @desc    Submit application
// @route   PUT /api/students/application/:id/submit
// @access  Private
const submitApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    // Check if the user is the owner of the application
    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to submit this application');
    }

    // Check if application is in a draft state
    if (application.status !== 'draft') {
      res.status(400);
      throw new Error('Application already submitted');
    }

    // Update application status
    application.status = 'submitted';
    application.statusHistory.push({
      status: 'submitted',
      remarks: 'Application submitted for review',
      updatedBy: req.user._id,
      date: Date.now(),
    });

    const updatedApplication = await application.save();

    // Get user details
    const user = await User.findById(req.user._id);

    // Send confirmation email
    const message = `
      <h1>Application Submitted</h1>
      <p>Dear ${user.name},</p>
      <p>Your application has been successfully submitted for review. Your application ID is: <strong>${updatedApplication._id}</strong></p>
      <p>You can track the status of your application on your dashboard.</p>
      <p>Thank you,<br/>ABES College Admissions Team</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Application Submitted Successfully',
        message,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Continue even if email fails
    }

    res.json(updatedApplication);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

export {
  createApplication,
  getApplicationById,
  updateApplication,
  getMyApplications,
  submitApplication,
};