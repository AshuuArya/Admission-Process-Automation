import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Personal Information
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    category: {
      type: String,
      required: true,
      enum: ['general', 'obc', 'sc', 'st', 'other'],
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // Academic Information
    academicDetails: {
      tenthBoard: { type: String, required: true },
      tenthPercentage: { type: Number, required: true },
      tenthYearOfPassing: { type: Number, required: true },
      twelfthBoard: { type: String, required: true },
      twelfthPercentage: { type: Number, required: true },
      twelfthYearOfPassing: { type: Number, required: true },
      graduationUniversity: { type: String },
      graduationPercentage: { type: Number },
      graduationYearOfPassing: { type: Number },
    },
    // Course Preferences
    coursePreferences: [
      {
        courseName: { type: String, required: true },
        priority: { type: Number, required: true },
      },
    ],
    // Documents
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
      },
    ],
    // Application Status
    status: {
      type: String,
      required: true,
      enum: [
        'draft',
        'submitted',
        'under_review',
        'documents_pending',
        'approved',
        'rejected',
      ],
      default: 'draft',
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        remarks: {
          type: String,
        },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Payment Information
    paymentInfo: {
      transactionId: { type: String },
      amount: { type: Number },
      paymentDate: { type: Date },
      paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
      },
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;