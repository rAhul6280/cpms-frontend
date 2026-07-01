import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../../services/recruiter.service';
import { toast } from 'react-toastify';
import { FaSearch, FaFilter, FaUserGraduate, FaCode, FaBook, FaStar } from 'react-icons/fa';

function BrowseStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    branch: '',
    degree: '',
    skills: '',
    minCgpa: ''
  });
  
  const navigate = useNavigate();

  const fetchStudents = async (currentFilters = null) => {
    setLoading(true);
    try {
      const activeFilters = {};
      const targetFilters = currentFilters || filters;
      
      Object.keys(targetFilters).forEach(key => {
        if (targetFilters[key]) {
          activeFilters[key] = targetFilters[key];
        }
      });
      
      const response = await getStudents(activeFilters);
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchStudents(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { branch: '', degree: '', skills: '', minCgpa: '' };
    setFilters(clearedFilters);
    fetchStudents(clearedFilters);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaSearch className="mr-3 text-indigo-600" />
          Browse Students
        </h2>
        
        <form onSubmit={handleApplyFilters} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4 text-gray-700 dark:text-gray-200 font-semibold">
            <FaFilter className="mr-2" />
            Filter Students
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch</label>
              <input
                type="text"
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                placeholder="e.g. Computer Science"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree</label>
              <input
                type="text"
                name="degree"
                value={filters.degree}
                onChange={handleFilterChange}
                placeholder="e.g. B.Tech"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={filters.skills}
                onChange={handleFilterChange}
                placeholder="e.g. React, Node, Python"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min CGPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="minCgpa"
                value={filters.minCgpa}
                onChange={handleFilterChange}
                placeholder="e.g. 8.0"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 min-h-125">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full bg-gray-50 dark:bg-gray-800 mb-4">
              <FaUserGraduate className="text-4xl text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No students found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {students.map((student) => (
              <div 
                key={student._id} 
                onClick={() => navigate(`/dashboard/students/${student._id}`)}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="h-2 bg-indigo-600 w-full group-hover:bg-indigo-500 transition-colors"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.user?.email || 'No email provided'}</p>
                    </div>
                    <div className="flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold px-3 py-1 rounded-full text-sm">
                      <FaStar className="mr-1 text-yellow-500" /> {student.cgpa || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <FaBook className="w-4 h-4 mr-3 text-indigo-400" />
                      <span>{student.degree || 'Degree not specified'}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <FaUserGraduate className="w-4 h-4 mr-3 text-indigo-400" />
                      <span>{student.branch || 'Branch not specified'}</span>
                    </div>
                    <div className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                      <FaCode className="w-4 h-4 mr-3 mt-1 text-indigo-400" />
                      <div className="flex-1 flex flex-wrap gap-1">
                        {student.skills && student.skills.length > 0 ? (
                          student.skills.slice(0, 4).map((skill, idx) => (
                            <span key={idx} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">No skills listed</span>
                        )}
                        {student.skills && student.skills.length > 4 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">+{student.skills.length - 4} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium group-hover:underline">
                      View complete profile &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseStudents;
