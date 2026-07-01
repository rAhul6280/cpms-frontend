import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import { updateProfile, updateResume } from '../../services/student.service';
import { toast } from 'react-toastify';

function Profile() {
  const { user, fetchUserData } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    degree: '',
    skills: [],
    cgpa: '',
    projectDetails: [],
    address: '',
    branch: '',
    rollNumber: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        fullName: user.profile.fullName || '',
        age: user.profile.age || '',
        degree: user.profile.degree || '',
        skills: user.profile.skills || [],
        cgpa: user.profile.cgpa || '',
        projectDetails: user.profile.projectDetails || [],
        address: user.profile.address || '',
        branch: user.profile.branch || '',
        rollNumber: user.profile.rollNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !formData.skills.includes(newSkill)) {
        setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projectDetails];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projectDetails: updatedProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projectDetails: [...formData.projectDetails, { title: '', description: '', githubLink: '', liveLink: '' }],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projectDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, projectDetails: updatedProjects });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    // Validate if at least one skill is present
    if (formData.skills.length === 0) {
      toast.error("Please add at least one skill.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await updateProfile(formData);
      if (res.success) {
        toast.success(res.message || "Profile updated successfully!");
        fetchUserData(); // Refresh user data to get updated profile
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error("Please select a resume file first.");
      return;
    }
    setResumeLoading(true);
    try {
      const res = await updateResume(resumeFile);
      if (res.success) {
        toast.success("Resume updated successfully!");
        setResumeFile(null);
        fetchUserData(); // Refresh user data to get updated resume link
      }
    } catch (error) {
      toast.error(error.message || "Failed to update resume");
    } finally {
      setResumeLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Update Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profile Information</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Update your personal and academic details below.</p>
        
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Number *</label>
              <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree *</label>
              <input type="text" name="degree" value={formData.degree} onChange={handleChange} required className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-500" placeholder="e.g. B.Tech" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch *</label>
              <input type="text" name="branch" value={formData.branch} onChange={handleChange} required className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-500" placeholder="e.g. Computer Science" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CGPA *</label>
              <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} required className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills * (Press Enter or Comma to add)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 dark:text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-800 hover:text-blue-900 dark:hover:text-blue-200 focus:outline-none">
                      <span className="sr-only">Remove skill</span>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                value={skillInput} 
                onChange={handleSkillInputChange} 
                onKeyDown={handleSkillKeyDown}
                className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-500" 
                placeholder="Type a skill and press Enter..." 
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Projects</label>
                <button type="button" onClick={addProject} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  Add Project
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.projectDetails.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No projects added yet.</p>
                ) : (
                  formData.projectDetails.map((project, index) => (
                    <div key={index} className="p-4 border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 relative">
                      <button type="button" onClick={() => removeProject(index)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 dark:hover:text-red-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Title *</label>
                          <input type="text" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} required className="w-full px-3 py-1.5 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:placeholder:text-gray-500" placeholder="Project Title" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">GitHub Link</label>
                          <input type="url" value={project.githubLink} onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)} className="w-full px-3 py-1.5 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:placeholder:text-gray-500" placeholder="https://github.com/..." />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Live Link</label>
                          <input type="url" value={project.liveLink} onChange={(e) => handleProjectChange(index, 'liveLink', e.target.value)} className="w-full px-3 py-1.5 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:placeholder:text-gray-500" placeholder="https://..." />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                        <textarea value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} rows="2" className="w-full px-3 py-1.5 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:placeholder:text-gray-500" placeholder="Briefly describe the project..."></textarea>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Resume Upload Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resume</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Upload or update your resume (PDF/DOCX).</p>
        
        {user?.profile?.resume && (
          <div className="mb-4">
            <a href={user.profile.resume} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              View Current Resume
            </a>
          </div>
        )}

        <form onSubmit={handleResumeSubmit} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            onChange={handleResumeChange} 
            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
          />
          <button type="submit" disabled={resumeLoading || !resumeFile} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 whitespace-nowrap">
            {resumeLoading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

