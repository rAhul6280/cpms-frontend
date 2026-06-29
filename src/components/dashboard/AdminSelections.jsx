import React, { useState, useEffect } from 'react';
import { getAllSelections, getFilteredSelections, updateSelectionStatus } from '../../services/admin.service';
import { toast } from 'react-toastify';
import { FaUserGraduate, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaFilter, FaBuilding } from 'react-icons/fa';

function AdminSelections() {
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [processingId, setProcessingId] = useState(null);

  const fetchSelections = async (status = 'all') => {
    setLoading(true);
    try {
      const response = status === 'all' 
        ? await getAllSelections() 
        : await getFilteredSelections(status);
        
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
    fetchSelections(filterStatus);
  }, [filterStatus]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleUpdateStatus = async (selectionId, newStatus) => {
    setProcessingId(selectionId);
    try {
      const response = await updateSelectionStatus(selectionId, newStatus);
      if (response.success) {
        toast.success(`Selection ${newStatus} successfully!`);
        // Refresh list or update locally
        setSelections(prev => 
          prev.map(sel => 
            sel._id === selectionId ? { ...sel, status: newStatus } : sel
          )
        );
      }
    } catch (error) {
      toast.error(error.message || `Failed to ${newStatus} selection`);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
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
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <FaBriefcase className="mr-3 text-indigo-600" />
              Manage Selections
            </h2>
            <p className="text-gray-500">Review, approve, or reject student hiring selections across all recruiters.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-200">
            <FaFilter className="mx-3 text-gray-400" />
            <div className="flex space-x-1">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === status 
                      ? 'bg-white shadow-sm text-indigo-700 border border-gray-200' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : selections.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <div className="inline-block p-6 rounded-full bg-white shadow-sm mb-4">
                <FaUserGraduate className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No selections found</h3>
              <p className="text-gray-500">There are no selections {filterStatus !== 'all' ? `with ${filterStatus} status` : 'yet'}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selections.map((selection) => (
                <div 
                  key={selection._id} 
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className={`h-2 w-full ${
                    selection.status === 'approved' ? 'bg-green-500' : 
                    selection.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={selection.student?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                          alt="Student Avatar" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {selection.student?.fullName || 'Unknown Student'}
                          </h3>
                          <p className="text-sm text-gray-500 truncate w-32 md:w-48">
                            {selection.student?.user?.email || 'No email'}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center uppercase tracking-wider ${getStatusStyle(selection.status)}`}>
                        {getStatusIcon(selection.status)}
                        {selection.status}
                      </div>
                    </div>
                    
                    <div className="space-y-3 flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-center text-sm">
                        <FaBuilding className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 font-medium w-24">Recruiter:</span>
                        <span className="text-gray-900 font-semibold truncate flex-1">{selection.recruiter?.fullName || 'Unknown Company'}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <FaBriefcase className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 font-medium w-24">Role:</span>
                        <span className="text-gray-900 font-semibold">{selection.selectionRole || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <FaMoneyBillWave className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 font-medium w-24">CTC:</span>
                        <span className="text-gray-900 font-semibold">{selection.ctc ? `${selection.ctc} LPA` : 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <FaCalendarAlt className="w-4 h-4 text-indigo-400 mr-3" />
                        <span className="text-gray-600 font-medium w-24">Date:</span>
                        <span className="text-gray-900">{formatDate(selection.createdAt)}</span>
                      </div>
                    </div>
                    
                    {selection.status === 'pending' && (
                      <div className="mt-5 pt-4 border-t border-gray-100 flex gap-3">
                        <button 
                          disabled={processingId === selection._id}
                          onClick={() => handleUpdateStatus(selection._id, 'approved')}
                          className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center disabled:opacity-70"
                        >
                          {processingId === selection._id ? 'Processing...' : 'Approve'}
                        </button>
                        <button 
                          disabled={processingId === selection._id}
                          onClick={() => handleUpdateStatus(selection._id, 'rejected')}
                          className="flex-1 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-xl transition-colors flex items-center justify-center disabled:opacity-70"
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

export default AdminSelections;
