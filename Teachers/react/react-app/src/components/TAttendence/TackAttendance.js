// import React, { useState } from 'react';
// import './TackAttendance.css';
// import { Link, useNavigate} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
// import studentss from './images/Ellipse 120.png';

// const students = [
//   { id: 1, name: "1 Kalyani Gaikar" },
//   { id: 2, name: "2 Kalyani Gaikar" },
//   { id: 3, name: "3 Kalyani Gaikar" },
//   { id: 4, name: "4 Kalyani Gaikar" },
//   { id: 5, name: "5 Kalyani Gaikar" },
//   { id: 6, name: "6 Kalyani Gaikar" },
//   { id: 7, name: "7 Kalyani Gaikar" },
//   { id: 8, name: "8 Kalyani Gaikar" },
//   { id: 9, name: "9 Kalyani Gaikar" },
//   { id: 10, name: "10 Kalyani Gaikar" },
//   { id: 11, name: "11 Kalyani Gaikar" },
//   { id: 12, name: "12 Kalyani Gaikar" },
//   { id: 13, name: "13 Kalyani Gaikar" },
//   { id: 14, name: "14 Kalyani Gaikar" },
//   { id: 15, name: "15 Kalyani Gaikar" },
//   { id: 16, name: "16 Kalyani Gaikar" },
// ];

// function TackAttendance() {
//   const [attendance, setAttendance] = useState(
//     students.map(() => ({ selectedOption: null, showOptions: false }))
//   );
//   const navigate = useNavigate();

//   const handleImageClick = (index) => {
//     setAttendance(prevState =>
//       prevState.map((item, idx) =>
//         idx === index ? { ...item, showOptions: true } : item
//       )
//     );
//   };

//   const handleOptionChange = (index, value) => {
//     setAttendance(prevState =>
//       prevState.map((item, idx) =>
//         idx === index
//           ? { ...item, selectedOption: value, showOptions: false }
//           : item
//       )
//     );
//   };

//   const getBackgroundColor = (option) => {
//     switch (option) {
//       case 'A':
//         return '#FF0000';
//       case 'P':
//         return '#046B3A';
//       case 'L':
//         return '#E4AC1A';
//       default:
//         return 'transparent';
//     }
//   };

//   const handleSubmit = () => {
//     const totals = attendance.reduce((acc, curr) => {
//       if (curr.selectedOption) {
//         acc[curr.selectedOption] = (acc[curr.selectedOption] || 0) + 1;
//       }
//       return acc;
//     }, {});

//     navigate('/AttendanceSubmit', {
//       state: {
//         present: totals['P'] || 0,
//         absent: totals['A'] || 0,
//         leave: totals['L'] || 0,
//       },
//     });
//   };

//   return (
//     <div className="Tackcontener">
//     <Link to="/Attendancecard"><FontAwesomeIcon icon={faArrowLeft} className='Attendancebackicon' /></Link>
//       <div className="Tackcontenertext">
//         <h1>A1 <br></br>English</h1>
//       </div>
//       <div className="TackList">
//         {students.map((student, index) => (
//           <div className="TackListBox" key={student.id}>
//             <img src={studentss} onClick={() => handleImageClick(index)} style={{ cursor: 'pointer' }} />
//             {attendance[index].showOptions && (
//               <select
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 defaultValue=""
//               >
//                 <option value="" disabled>Select</option>
//                 <option value="A">A</option>
//                 <option value="P">P</option>
//                 <option value="L">L</option>
//               </select>
//             )}
//             {attendance[index].selectedOption && (
//               <span
//                 style={{
//                   backgroundColor: getBackgroundColor(attendance[index].selectedOption),
//                   padding: '2px 8px 2px 8px',
//                 }}
//               >
//                 {attendance[index].selectedOption}
//               </span>
//             )}
//             <h2>{student.name}</h2>
//           </div>
//         ))}
//       </div>
//       <div className="Attendancesubmit">
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     </div>
//   );
// }

// export default TackAttendance;



import React, { useEffect, useState } from 'react';
import './TackAttendance.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TackAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const college_code = sessionStorage.getItem('college_code');
  const division = sessionStorage.getItem('division');
  const stand = location.state?.stand || sessionStorage.getItem('stand');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const college_code = sessionStorage.getItem('college_code');
        const division = sessionStorage.getItem('division');
        const standard = sessionStorage.getItem('standard');
        const response = await fetch(`https://apiaws.onrender.com/students?college_code=${college_code}&stand=10&division=A`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched students data:', data);
        if (data && data.length > 0) {
          setStudents(data);
          setAttendance(data.map(() => ({ selectedOption: null, showOptions: false })));
        } else {
          console.warn('No students found in the response data');
          setStudents([]);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(error.message);
      }
    };
    if (college_code && stand && division) {
      fetchStudents();
    } else {
      console.error('Missing required parameters: college_code, stand, or division');
      setError('Missing required parameters: college_code, stand, or division');
    }
  }, [college_code, stand, division]);

  const handleImageClick = (index) => {
    setAttendance(prevState =>
      prevState.map((item, idx) =>
        idx === index ? { ...item, showOptions: true } : item
      )
    );
  };

  const handleOptionChange = (index, value) => {
    setAttendance(prevState =>
      prevState.map((item, idx) =>
        idx === index
          ? { ...item, selectedOption: value, showOptions: false }
          : item
      )
    );
  };

  const getBackgroundColor = (option) => {
    switch (option) {
      case 'A':
        return '#FF0000';
      case 'P':
        return '#046B3A';
      case 'L':
        return '#E4AC1A';
      default:
        return 'transparent';
    }
  };

  const handleSubmit = () => {
    const totals = attendance.reduce((acc, curr) => {
      if (curr.selectedOption) {
        acc[curr.selectedOption] = (acc[curr.selectedOption] || 0) + 1;
      }
      return acc;
    }, {});
    console.log('Attendance totals:', totals); 
    navigate('/AttendanceSubmit', {
      state: {
        present: totals['P'] || 0,
        absent: totals['A'] || 0,
        leave: totals['L'] || 0,
      },
    });
  };

  return (
    <div className="Tackcontener">
      <Link to="/Attendancecard"><FontAwesomeIcon icon={faArrowLeft} className='Attendancebackicon' /></Link>
      <div className="Tackcontenertext">
        <h1>A1 <br />English</h1>
      </div>
      <div className="TackList">
        {error ? (
          <p>Error fetching students: {error}</p>
        ) : students.length > 0 ? (
          students.map((student, index) => (
            <div className="TackListBox" key={student.studentid}>
              <img src={`data:image/jpeg;base64,${student.profile_img}`} alt="student" onClick={() => handleImageClick(index)} style={{ cursor: 'pointer' }} />
              <h2 className="student-name">{`${student.roll_no} ${student.Name}`}</h2>
              {attendance[index]?.showOptions && (
                <select
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select</option>
                  <option value="A">A</option>
                  <option value="P">P</option>
                  <option value="L">L</option>
                </select>
              )}
              {attendance[index]?.selectedOption && (
                <span
                  style={{
                    backgroundColor: getBackgroundColor(attendance[index].selectedOption),
                    padding: '2px 8px 2px 8px',
                  }}
                >
                  {attendance[index].selectedOption}
                </span>
              )}
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
      <div className="Attendancesubmit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TackAttendance;
