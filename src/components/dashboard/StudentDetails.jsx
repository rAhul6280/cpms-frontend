import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentDetails, hireStudent } from '../../services/recruiter.service';
import { toast } from 'react-toastify';
import { FaUserGraduate, FaCode, FaBook, FaStar, FaMapMarkerAlt, FaIdCard, FaEnvelope, FaFilePdf, FaBriefcase, FaMoneyBillWave, FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Loading from '../Loading';

function StudentDetails() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(false);
  const [hireForm, setHireForm] = useState({
    ctc: '',
    selectionRole: ''
  });
  const [showHireForm, setShowHireForm] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentDetails(studentId);
        if (response.success) {
          setStudent(response.data);
        }
      } catch (error) {
        toast.error(error.message || 'Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  const handleHireChange = (e) => {
    const { name, value } = e.target;
    setHireForm(prev => ({ ...prev, [name]: value }));
  };

  const handleHireSubmit = async (e) => {
    e.preventDefault();
    if (!hireForm.ctc || !hireForm.selectionRole) {
      toast.error('Please fill all fields');
      return;
    }
    
    setHiring(true);
    try {
      const response = await hireStudent({
        studentId,
        ctc: hireForm.ctc,
        selectionRole: hireForm.selectionRole
      });
      if (response.success) {
        toast.success('Student hiring process initiated successfully!');
        setShowHireForm(false);
        setHireForm({ ctc: '', selectionRole: '' });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to hire student');
    } finally {
      setHiring(false);
    }
  };

  if (loading) {
    return <Loading/>
     
  }

  if (!student) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Student not found</h3>
        <button onClick={() => navigate(-1)} className="text-indigo-600 dark:text-indigo-400 hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to Students
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 dark:border-indigo-900/50 mb-4">
              <img 
                src={student.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                alt={student.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{student.fullName}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{student.user?.email}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <FaStar className="mr-1 text-yellow-500" /> CGPA: {student.cgpa || 'N/A'}
              </span>
              <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <FaUserGraduate className="mr-1" /> {student.degree || 'Degree'}
              </span>
            </div>

            {student.resume && (
              <a 
                href={student.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <FaFilePdf className="mr-2 text-red-500" /> View Resume
              </a>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b dark:border-gray-800 pb-2">Personal Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <FaIdCard className="text-gray-400 dark:text-gray-500 mt-1 mr-3 w-5 h-5" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Roll Number</p>
                  <p className="text-gray-900 dark:text-white">{student.rollNumber || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaBook className="text-gray-400 dark:text-gray-500 mt-1 mr-3 w-5 h-5" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Branch</p>
                  <p className="text-gray-900 dark:text-white">{student.branch || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaUserGraduate className="text-gray-400 dark:text-gray-500 mt-1 mr-3 w-5 h-5" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Age</p>
                  <p className="text-gray-900 dark:text-white">{student.age || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500 mt-1 mr-3 w-5 h-5" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Address</p>
                  <p className="text-gray-900 dark:text-white">{student.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills, Projects, and Hiring */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <FaCode className="mr-2 text-indigo-600" /> Skills
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {student.skills && student.skills.length > 0 ? (
                student.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No skills listed</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaBriefcase className="mr-2 text-indigo-600" /> Projects
            </h3>
            
            {student.projectDetails && student.projectDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.projectDetails.map((project, index) => (
                  <div key={index} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex space-x-3">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <FaGithub className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                          <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No projects listed</p>
            )}
          </div>

          {/* Hiring Section */}
          <div className="bg-indigo-900 rounded-3xl shadow-lg border border-indigo-800 p-8 text-white relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Interested in this student?</h3>
                <p className="text-indigo-200">Start the hiring process by making an initial offer.</p>
              </div>
              <button 
                onClick={() => setShowHireForm(!showHireForm)}
                className="mt-4 md:mt-0 px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
              >
                {showHireForm ? 'Cancel' : 'Hire Student'}
              </button>
            </div>

            {showHireForm && (
              <form onSubmit={handleHireSubmit} className="mt-8 relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-100 mb-1">Offered Role</label>
                    <input
                      type="text"
                      name="selectionRole"
                      value={hireForm.selectionRole}
                      onChange={handleHireChange}
                      placeholder="e.g. Software Engineer"
                      required
                      className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-100 mb-1">CTC Offered (in LPA)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMoneyBillWave className="text-indigo-200" />
                      </div>
                      <input
                        type="number"
                        name="ctc"
                        value={hireForm.ctc}
                        onChange={handleHireChange}
                        placeholder="e.g. 12"
                        required
                        className="w-full pl-10 px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={hiring}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
                >
                  {hiring ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Submit Offer'
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
