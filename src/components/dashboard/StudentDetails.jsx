import React from 'react';
import { useParams } from 'react-router-dom';

function StudentDetails() {
  const { studentId } = useParams();
  
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Details</h2>
      <p className="text-gray-500">Details for student ID: {studentId}</p>
    </div>
  );
}

export default StudentDetails;
