import React, { useState, useEffect } from 'react';
import { getStudentSelections } from '../../services/student.service';
import { toast } from 'react-toastify';
import { FaBuilding, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaFilter } from 'react-icons/fa';

function StudentSelections() {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchSelections = async () => {
    setLoading(true);
    try {
      const response = await getStudentSelections();
      if (response.success) {
        setSelections(response.data);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch selections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelections();
  }, []);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredSelections = filterStatus === 'all' 
    ? selections 
    : selections.filter(s => s.status === filterStatus);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle className="mr-1.5" />;
      case 'rejected':
        return <FaTimesCircle className="mr-1.5" />;
      case 'pending':
      default:
        return <FaClock className="mr-1.5" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <FaBriefcase className="mr-3 text-indigo-600" />
              My Applications & Selections
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Track your selection status with various companies.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
            <FaFilter className="mx-3 text-gray-400 dark:text-gray-500" />
            <div className="flex space-x-1">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === status 
                      ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-700 dark:text-indigo-400 border border-gray-200 dark:border-gray-600' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-125">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredSelections.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <div className="inline-block p-6 rounded-full bg-white dark:bg-gray-800 shadow-sm mb-4">
                <FaBuilding className="text-4xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No selections found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {filterStatus !== 'all' 
                  ? `You don't have any applications with ${filterStatus} status.` 
                  : 'You haven\'t been selected by any companies yet. Keep applying!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSelections.map((selection) => (
                <div 
                  key={selection._id} 
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className={`h-2 w-full ${
                    selection.status === 'approved' ? 'bg-green-500' : 
                    selection.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={selection.recruiter?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                          alt="Company Avatar" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700 shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            {selection.recruiter?.fullName || 'Unknown Company'}
                          </h3>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center uppercase tracking-wider ${getStatusStyle(selection.status)}`}>
                        {getStatusIcon(selection.status)}
                        {selection.status}
                      </div>
                    </div>
                    
                    <div className="space-y-3 flex-1 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center text-sm">
                        <FaBriefcase className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 dark:text-gray-400 font-medium w-16">Role:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{selection.selectionRole || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <FaMoneyBillWave className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 dark:text-gray-400 font-medium w-16">CTC:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">{selection.ctc ? `${selection.ctc} LPA` : 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <FaCalendarAlt className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 dark:text-gray-400 font-medium w-16">Date:</span>
                        <span className="text-gray-900 dark:text-white">{formatDate(selection.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentSelections;
