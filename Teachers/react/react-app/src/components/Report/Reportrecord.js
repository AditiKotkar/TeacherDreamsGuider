// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import './Reportrecord.css';

// const data = [
//   { name: 'English', value: 650 },
//   { name: 'Hindi', value: 860 },
//   { name: 'Marathi', value: 880 },
//   { name: 'Mathematics', value: 100 },
//   { name: 'Science', value: 670 },
//   { name: 'History', value: 540 },
//   { name: 'Art', value: 540 },
//   { name: 'Sports', value: 910 },
// ];

// const COLORS = ['#E80CD2', '#008000', '#2910BC', '#EA1212', '#0961F5', '#FF007A', '#8AB60E', '#D9C726'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {(percent * 515).toFixed(0)}%
//     </text>
//   );
// };

// const Reportrecord = () => {
//   const location = useLocation();
//   const { student } = location.state;

//   return (
//     <div className='Reportcontent'>
//       <div className='feedbackheader'>
//         <Link to="/student"><FontAwesomeIcon icon={faArrowLeft} className='Attendanceicon' /></Link>
//         <h1>Reports</h1>
//       </div>
//       <div className='Reportstd'>
//         <div className='Reportimg'>
//           <div className="img-1"></div>
//         </div>
//         <div className='Reportname'>
//           <span className="Reporth1">Hi, {student.Name}</span><br></br>
//           <span className="Reporth2">Roll Number : {student.roll_no}</span><br></br>
//           <span className="Reporth2">Class : {student.standard}</span>
//         </div>
//       </div>
//       <div className='Reportresult'>
//         <div className='ReportSubjects'>
//           <h1>Subjects</h1>
//           <ul>
//             <li>English</li>
//             <li>Hindi</li>
//             <li>Marathi</li>
//             <li>Mathematics</li>
//             <li>Science</li>
//             <li>History</li>
//             <li>Art</li>
//             <li>Sports</li>
//           </ul>
//         </div>
//         <div className='ReportSubjects1'>
//           <h1>Percentage</h1>
//           <ul>
//             <li>75%</li>
//             <li>83%</li>
//             <li>91%</li>
//             <li>30%</li>
//             <li>67%</li>
//             <li>76%</li>
//             <li>85%</li>
//             <li>98%</li>
//           </ul>
//         </div>
//         <div className='ReportSubjects2'>
//           <h1>Results</h1>
//           <ul>
//             <li>Pass</li>
//             <li>Pass</li>
//             <li>Pass</li>
//             <li>Fail</li>
//             <li>Pass</li>
//             <li>Pass</li>
//             <li>Pass</li>
//             <li>Pass</li>
//           </ul>
//         </div>
//       </div>
//       <div className='percentage-contener'>
//         <div className='Reportleft'>
//           <h1>Your Interest</h1>
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value" >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         <div className='Reportright'>
//           <div className='Reportcolors'>
//             <div className='RCparple'></div>
//             <div className='RCgreen'></div>
//             <div className='RCBlue'></div>
//             <div className='RCred'></div>
//             <div className='RCblue'></div>
//             <div className='RCpink'></div>
//             <div className='RCg'></div>
//             <div className='RCyello'></div>
//           </div>
//           <div className='Reportsubjects'>
//             <ul>
//               <li>English</li>
//               <li>Hindi</li>
//               <li>Marathi</li>
//               <li>Mathematics</li>
//               <li>Science</li>
//               <li>History</li>
//               <li>Art</li>
//               <li>Sports</li>
//             </ul>
//           </div> 
//         </div>
//       </div>
//       <div className='Reportline'></div>
//       <div className='Report3conten'>
//         <div className='Reportleftcontent'>
//           <p>You have Completed <span>11 quizz</span> of this semester</p>
//           <div className='Reportleftcircle'>
//             <h1><span>11</span>/12</h1>
//             <h1>Quiz Completed</h1>
//           </div>
//           <h1>Average Marks:<span>13</span>/15</h1>
//           <h1>Score:<span>Top 10%</span></h1>
//         </div>
//         <div className='Reportrightcontent'>
//           <h1>Subject Quizz/ Class Test</h1>
//           <div className='ReportsubjectsQuizz'>
//             <ul>
//               <li>English : <span>2</span>/2</li>
//               <li>Hindi : <span>1</span>/2</li>
//               <li>Marathi : <span>2</span>/2</li>
//               <li>Math : <span>2</span>/2</li>
//               <li>Science : <span>2</span>/2</li>
//               <li>History : <span>2</span>/2</li>
//               <li>Art : <span>2</span>/2</li>
//             </ul>
//           </div> 
//         </div>
//       </div>
//       <div className='Reportline'></div>
//       <div className='Reportperformance'>
//         <div className='Reportperformanceleft'>
//           <p>Your Overall Performance This Semester</p>
//           <ol>
//             <li>Class Attended : <span>45</span>/50</li>
//             <li>Quiz Taken : <span>11</span>/12</li>
//             <li>Assignment Submitted : <span>21</span>/24</li>
//             <li>Presentation Completed : <span>3</span>/4</li>
//           </ol>
//         </div>
//         <div className='Reportperformanceright'>
//           <div className='ReportPerformancecircle'>
//             <h1>90%</h1>
//             <h2>Marks</h2>
//             <h2>Achieved</h2>
//           </div>
//         </div>
//       </div>
//       <div className='Reportline'></div>
//       <div className='ReportRemark'>
//         <h1>Your Report</h1>
//         <h2>Remark</h2>
//         <ol>
//           <li>Your knowledge level exceeds expectations in Hindi and Sports. You worked well with all members of the team.</li>
//           <li>Student performed exceptionally well during the rotation.</li>
//           <li>Your teams universally praised your performance, noting that you exhibited independence and skill at the level of an intern in the workup and management of your patients.</li>
//         </ol>
//       </div>
//       <div className='Reportline'></div>
//     </div>
//   );
// };

// export default Reportrecord;




// Report.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Reportrecord.css';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'English', value: 650 },
  { name: 'Hindi', value: 860 },
  { name: 'Marathi', value: 880 },
  { name: 'Mathematics', value: 100 },
  { name: 'Science', value: 670 },
  { name: 'History', value: 540 },
  { name: 'Art', value: 540 },
  { name: 'Sports', value: 910 },
];

const COLORS = [
  '#FF007A', // English
  '#008000', // Hindi
  '#EA1212', // Marathi
  '#D9C726', // Mathematics
  '#0961F5', // Science
  '#2910BC', // History
  '#8AB60E', // Art
  '#E80CD2', // Sports
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const Report = () => {
  const [isActive, setIsActive] = useState(false);
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [totalPending, setTotalPending] = useState(0);
  const [totalSubmitted, setTotalSubmitted] = useState(0);

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const studentid = sessionStorage.getItem('student_id');
        const college_code = sessionStorage.getItem('college_code');
        const division = sessionStorage.getItem('division');
        const standard = sessionStorage.getItem('standard');

        const response = await fetch(`https://apiaws.onrender.com/report?college_code=${college_code}&division=${division}&standard=${standard}&student_id=${studentid}`);
        const data = await response.json();
        console.log('Fetched subjects data:', data);
        if (Array.isArray(data)) {
          setSubjects(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching subjects information:', error);
      }
    };

    const fetchStudentData = () => {
      const fullname = sessionStorage.getItem('fullname');
      const rollnumber = sessionStorage.getItem('rollnumber');
      const standard = sessionStorage.getItem('standard');
      if (fullname && rollnumber && standard) {
        setStudent({
          fullname,
          rollnumber,
          standard,
        });
      }
    };

    const fetchAssignmentsData = async () => {
      try {
        const studentid = sessionStorage.getItem('student_id');
        const college_code = sessionStorage.getItem('college_code');
        const division = sessionStorage.getItem('division');
        const standard = sessionStorage.getItem('standard');
        const response = await fetch(`https://apiaws.onrender.com/assignment?college_code=${college_code}&student_id=${studentid}&standard=${standard}&division=${division}&currentYear=2024&currentMonth=06`);
        const data = await response.json();
        console.log('Fetched assignments data:', data);
        if (data) {
          setAssignments(data.assignments);
          setTotalPending(data.total_pending);
          setTotalSubmitted(data.total_submitted);
          setAttendance(data.attendance);
        } else {
          console.error('Fetched data is not as expected:', data);
        }
      } catch (error) {
        console.error('Error fetching assignments information:', error);
      }
    };

    fetchSubjectsData();
    fetchStudentData();
    fetchAssignmentsData();
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const totalAssignments = totalPending + totalSubmitted;
  return (
    <div className='Reportcontent'>
      <div className='feedbackheader'>
        <Link to="/student"><FontAwesomeIcon icon={faArrowLeft} className='Attendanceicon' /></Link>
        <h1>Reports</h1>
      </div>

      <div className='Reportstd'>
        <div className='Reportimg'>
          <div className="img-1"></div>
        </div>
        <div className='Reportname'>
          {student ? (
            <>
              <span className="Reporth1">Hi, {student.fullname}</span><br />
              <span className="Reporth2">Roll Number : {student.rollnumber}</span><br />
              <span className="Reporth2">Class : {student.standard}</span>
            </>
          ) : (
            <span></span>
          )}
        </div>
      </div>

      <div className='Reportresult'>
        <div className='ReportSubjects'>
          <h1>Subjects</h1>
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>{subject.subjectname}</li>
            ))}
          </ul>
        </div>
        <div className='ReportSubjects1'>
          <h1>Percentage</h1>
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>{subject.percentage}%</li>
            ))}
          </ul>
        </div>
        <div className='ReportSubjects2'>
          <h1>Results</h1>
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>{subject.percentage >= 35 ? 'Pass' : 'Fail'}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className='percentage-contener'>
        <div className='Reportleft'>
          <h1>Your Interest</h1>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='Reportright'>
          <div className='Reportcolors'>
            <div className='RCparple'></div>
            <div className='RCgreen'></div>
            <div className='RCBlue'></div>
            <div className='RCred'></div>
            <div className='RCblue'></div>
            <div className='RCpink'></div>
            <div className='RCg'></div>
            <div className='RCyello'></div>
          </div>
          <div className='Reportsubjects'>
            <ul>
              {subjects.map((subject, index) => (
                <li key={index}>{subject.subjectname}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='Reportline'></div>

      <div className='Report3conten'>
        <div className='Reportleftcontent'>
          <p>You have Completed <span>{totalSubmitted} assignments</span> of this semester</p>
          <div className='Reportleftcircle'>
            <h1><span>{totalSubmitted}</span>/{totalAssignments}</h1>
            <h1>Assignments Completed</h1>
          </div>
        </div>
        <div className='Reportrightcontent'>
          <h1>Subject Assignments</h1>
          <div className='ReportsubjectsQuizz'>
            <ul>
              {assignments.map((assignment, index) => (
                <li key={index}>{assignment.subject_name} : <span>{assignment.total_submitted}</span>/{assignment.total_pending + assignment.total_submitted}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='Reportline'></div>

      <div className='Reportperformance'>
        <div className='Reportperformanceleft'>
          <p>Your Overall Performance This Semester</p>
          <ol>
            <li>Class Attended : <span>{attendance.countPresent}</span>/{attendance.countPresent + attendance.countAbsent}</li>
            <li>Assignment Submitted : <span>{totalSubmitted}</span>/{totalAssignments}</li>
          </ol>
        </div>
        <div className='Reportperformanceright'>
          <div className='ReportPerformancecircle'>
            <h1>90%</h1>
          </div>
        </div>
      </div>

      <div className='Reportline'></div>
    </div>
  );
};

export default Report;
