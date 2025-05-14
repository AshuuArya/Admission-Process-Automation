import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PlusCircle, FileText, Clock, CheckCircle, AlertTriangle, AlertOctagon, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Application {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  documents: Array<{
    _id: string;
    name: string;
    type: string;
    isVerified: boolean;
  }>;
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  documents_pending: 'bg-orange-100 text-orange-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusIcons = {
  draft: <FileText size={16} />,
  submitted: <Clock size={16} />,
  under_review: <Clock size={16} />,
  documents_pending: <AlertTriangle size={16} />,
  approved: <CheckCircle size={16} />,
  rejected: <AlertOctagon size={16} />,
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/students/applications');
        setApplications(response.data);
      } catch (error) {
        toast.error('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusClass = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    return statusIcons[status as keyof typeof statusIcons] || <FileText size={16} />;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <Link
              to="/application/new"
              className="mt-4 md:mt-0 bg-[#0A3C8F] text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              New Application
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-1">Profile</h3>
              <p className="text-gray-600 mb-2">Manage your personal details</p>
              <Link
                to="/dashboard/profile"
                className="text-[#0A3C8F] font-medium hover:text-blue-700"
              >
                View Profile &rarr;
              </Link>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-1">Documents</h3>
              <p className="text-gray-600 mb-2">Upload and manage your documents</p>
              <Link
                to="/documents/upload"
                className="text-purple-700 font-medium hover:text-purple-800"
              >
                Upload Documents &rarr;
              </Link>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-1">Support</h3>
              <p className="text-gray-600 mb-2">Need help with your application?</p>
              <a
                href="#"
                className="text-green-700 font-medium hover:text-green-800"
              >
                Contact Support &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            My Applications
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 size={32} className="animate-spin text-[#0A3C8F]" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                You haven't submitted any applications yet.
              </p>
              <Link
                to="/application/new"
                className="bg-[#0A3C8F] text-white px-4 py-2 rounded-md inline-flex items-center hover:bg-blue-800 transition-colors"
              >
                <PlusCircle size={18} className="mr-2" />
                Create New Application
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Application ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Documents
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{application._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                            application.status
                          )}`}
                        >
                          <span className="mr-1">{getStatusIcon(application.status)}</span>
                          {application.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.documents.length} / 5
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/application/${application._id}`}
                          className="text-[#0A3C8F] hover:text-blue-800 mr-4"
                        >
                          View
                        </Link>
                        {application.status === 'draft' && (
                          <Link
                            to={`/application/${application._id}/edit`}
                            className="text-[#0A3C8F] hover:text-blue-800"
                          >
                            Edit
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;