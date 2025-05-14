// Authentication Types
export interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  isAdmin: boolean;
  isVerified: boolean;
}

// Application Types
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface AcademicDetails {
  tenthBoard: string;
  tenthPercentage: number;
  tenthYearOfPassing: number;
  twelfthBoard: string;
  twelfthPercentage: number;
  twelfthYearOfPassing: number;
  graduationUniversity?: string;
  graduationPercentage?: number;
  graduationYearOfPassing?: number;
}

export interface CoursePreference {
  courseName: string;
  priority: number;
}

export interface StatusHistory {
  status: string;
  remarks: string;
  updatedBy: string | User;
  date: Date;
}

export interface PaymentInfo {
  transactionId?: string;
  amount?: number;
  paymentDate?: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface Document {
  _id: string;
  user: string;
  application?: string;
  name: string;
  type: string;
  path: string;
  mimeType: string;
  size: number;
  uploadDate: Date;
  isVerified: boolean;
  verificationRemarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  _id: string;
  user: string | User;
  name: string;
  dateOfBirth: Date | string;
  gender: 'male' | 'female' | 'other';
  category: 'general' | 'obc' | 'sc' | 'st' | 'other';
  fatherName: string;
  motherName: string;
  address: Address;
  contactNumber: string;
  email: string;
  academicDetails: AcademicDetails;
  coursePreferences: CoursePreference[];
  documents: string[] | Document[];
  status: 'draft' | 'submitted' | 'under_review' | 'documents_pending' | 'approved' | 'rejected';
  statusHistory: StatusHistory[];
  paymentInfo: PaymentInfo;
  createdAt: Date;
  updatedAt: Date;
}

// Form Types
export interface ApplicationFormValues {
  name: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  fatherName: string;
  motherName: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  contactNumber: string;
  email: string;
  academicDetails: {
    tenthBoard: string;
    tenthPercentage: number | string;
    tenthYearOfPassing: number | string;
    twelfthBoard: string;
    twelfthPercentage: number | string;
    twelfthYearOfPassing: number | string;
    graduationUniversity?: string;
    graduationPercentage?: number | string;
    graduationYearOfPassing?: number | string;
  };
  coursePreferences: Array<{
    courseName: string;
    priority: number | string;
  }>;
}

export interface DocumentUploadFormValues {
  documentType: string;
  documentName: string;
  file: File | null;
}