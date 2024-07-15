// Report.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Report.css';

const Report = () => {
  const [selectedClass, setSelectedClass] = useState(10); // Default class selected
  const [selectedDivision, setSelectedDivision] = useState('A'); // Default division selected
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentData();
  }, [selectedClass, selectedDivision]);

  const fetchStudentData = async () => {
    try {
      const college_code = sessionStorage.getItem('college_code') || 'MGVP';
      const response = await fetch(`https://apiaws.onrender.com/students?college_code=${college_code}&stand=${selectedClass}&division=${selectedDivision}`);
      const data = await response.json();
      console.log('Fetched student data:', data); // Debugging: Log the fetched data
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching student information:', error);
    }
  };

  const handleStudentClick = (student) => {
    console.log('Selected student:', student); // Debugging: Log the selected student
    sessionStorage.setItem('student_id', student.studentid);
    sessionStorage.setItem('standard', selectedClass);
    sessionStorage.setItem('division', selectedDivision);
    sessionStorage.setItem('fullname', student.Name);
    sessionStorage.setItem('rollnumber', student.roll_no);
    navigate('/Reportrecord', { state: { student } });
  };

  return (
    <div className="ReportContainer">
      <h2>Student Report</h2>
      <div className="ReportLabel">
        <label htmlFor="classSelect">Select Class:</label>
        <select
          id="classSelect"
          value={selectedClass}
          onChange={(e) => setSelectedClass(parseInt(e.target.value))}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="ReportLabel">
        <label htmlFor="divisionSelect">Select Division:</label>
        <select
          id="divisionSelect"
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
        >
          {['A', 'B', 'C', 'D'].map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>
      </div>
      <div className="ReportsName">
        <div className="Reports">
          <h3>Students Name</h3>
          <h3>Roll Number</h3>
        </div>
        <ul>
          {students.map((student) => (
            <li key={student.roll_no} onClick={() => handleStudentClick(student)}>
              <div className="ReportImg">
                <img src={`data:image/jpeg;base64,${student.profile_img}`} alt={student.Name} />
              </div>
              <div className="Reports1">
                <p>{student.Name}</p>
                <p>{student.roll_no}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
