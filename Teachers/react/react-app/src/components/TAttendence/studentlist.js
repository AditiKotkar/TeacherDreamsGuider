// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from 'react-router-dom';
// import './studentlist.css';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllStudentData();
//   }, []);

//   const fetchAllStudentData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const college_code = sessionStorage.getItem('college_code');
//       const classList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//       const divisionList = ['A', 'B', 'C', 'D'];
//       const allStudents = [];

//       for (const selectedClass of classList) {
//         for (const selectedDivision of divisionList) {
//           const response = await fetch(`https://apiaws.onrender.com/students?college_code=${college_code}&stand=${selectedClass}&division=${selectedDivision}`);
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           const data = await response.json();
//           if (Array.isArray(data)) {
//             allStudents.push(...data);
//           } else {
//             console.error('Fetched data is not an array:', data);
//           }
//         }
//       }
//       setStudents(allStudents);
//     } catch (error) {
//       console.error('Error fetching student information:', error);
//       setError('Failed to load student data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStudentClick = (student) => {
//     sessionStorage.setItem('student_id', student.student_id);
//     navigate('/AttendanceCalendar', { state: { student } });
//   };

//   return (
//     <div className='ReportContainer'>
//       <div className='TAttendancecaln'>
//         <Link to="/Attendancecard"><FontAwesomeIcon icon={faArrowLeft} className='TAttendanceicons' /></Link>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div className='ReportsName'>
//           <div className='Reports'>
//             <h3>Students Name</h3>
//             <h3>Roll Number</h3>
//           </div>
//           <ul>
//             {students.map((student) => (
//               <li key={student.roll_no} onClick={() => handleStudentClick(student)}>
//                 <div className='ReportImg'>
//                   <img src={`data:image/jpeg;base64,${student.profile_img}`} alt={student.Name} />
//                 </div>
//                 <div className='Reports1'>
//                   <p>{student.Name}</p>
//                   <p>{student.roll_no}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentList;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './studentlist.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStudentData();
  }, []);

  const fetchAllStudentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const college_code = sessionStorage.getItem('college_code');
      const classList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const divisionList = ['A', 'B', 'C', 'D'];
      const allStudents = [];
      for (const selectedClass of classList) {
        for (const selectedDivision of divisionList) {
          const response = await fetch(`https://apiaws.onrender.com/students?college_code=${college_code}&stand=${selectedClass}&division=${selectedDivision}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            allStudents.push(...data);
          } else {
            console.error('Fetched data is not an array:', data);
          }
        }
      }
      setStudents(allStudents);
    } catch (error) {
      console.error('Error fetching student information:', error);
      setError('Failed to load student data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = (student) => {
    console.log('Clicked student:', student);
    sessionStorage.setItem('student_id', student.studentid); 
    navigate('/AttendanceCalendar'); 
  };

  return (
    <div className='ReportContainer'>
      <div className='TAttendancecaln'>
        <Link to="/Attendancecard"><FontAwesomeIcon icon={faArrowLeft} className='TAttendanceicons' /></Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='ReportsName'>
          <div className='Reports'>
            <h3>Students Name</h3>
            <h3>Roll Number</h3>
          </div>
          <ul>
            {students.map((student) => (
              <li key={student.roll_no} onClick={() => handleStudentClick(student)}>
                <div className='ReportImg'>
                  <img src={`data:image/jpeg;base64,${student.profile_img}`} alt={student.Name} />
                </div>
                <div className='Reports1'>
                  <p>{student.Name}</p>
                  <p>{student.roll_no}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentList;

