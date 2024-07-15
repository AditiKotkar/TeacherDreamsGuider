// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './Attendance.css';
// import { Link } from 'react-router-dom';

// const TAttendanceCal = () => {
//   const [value, setValue] = useState(new Date());
//   const [absentDates, setAbsentDates] = useState([
//     { title: 'Reasons of Holiday', date: new Date(2024, 5, 3), reason: 'ill' },
//     { title: 'Reasons of Holiday', date: new Date(2024, 5, 19), reason: 'Sister Function' },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [newDate, setNewDate] = useState(new Date());
//   const [newReason, setNewReason] = useState('');
//   const [newTitle, setNewTitle] = useState('Reasons of Holiday');

//   const [currentMonth, setCurrentMonth] = useState(value);

//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//       const day = date.getDay();
//       if (absentDates.some(absent => absent.date.toDateString() === date.toDateString())) {
//         return 'absent';
//       } else if (day === 0) {
//         return 'sunday';
//       } else if (day === 6) {
//         return 'saturday';
//       } else {
//         return 'weekday';
//       }
//     }
//   };

//   const handleAddAbsentDate = () => {
//     setAbsentDates([...absentDates, {title: newTitle, date: newDate, reason: newReason}]);
//     setShowModal(false);
//     setNewDate(new Date());
//     setNewReason('');
//     setNewTitle('Reasons of Holiday');
//   };

//   const handleMonthChange = ({ activeStartDate }) => {
//     setCurrentMonth(activeStartDate);
//   };

//   const getAbsentDatesForCurrentMonth = () => {
//     return absentDates.filter(absent => 
//       absent.date.getMonth() === currentMonth.getMonth() && 
//       absent.date.getFullYear() === currentMonth.getFullYear()
//     );
//   };

//   const absentDatesForCurrentMonth = getAbsentDatesForCurrentMonth();

//   return (
//     <div className='TAttendancecontener'>
//       <div className='TAttendancecal'>
//         <Link to="/StudentList"><FontAwesomeIcon icon={faArrowLeft} className='TAttendanceicon' /></Link>
//         <h1>Attendance</h1>
//         <FontAwesomeIcon icon={faPlus} className='TAttendanceicon' onClick={() => setShowModal(true)}/>
//       </div>
//       <div className='TAttendanceday'>
//         <div className='TAttendancedays'>
//           <Calendar
//             onChange={setValue}
//             value={value}
//             tileClassName={tileClassName}
//             onActiveStartDateChange={handleMonthChange}
//           />
//         </div>
//         <div className='Tattendancere'>
//           {absentDatesForCurrentMonth.length > 0 ? (
//             absentDatesForCurrentMonth.map((absent, index) => (
//               <div className='TAttendanceevents' key={index}>
//                 <div className='TAttendanceev'>
//                   <div className='TAttendanceevent'>
//                     <div className='TAttendancet'>
//                       <div className='TAttendancedot'></div>
//                       <p>{absent.date.toDateString()}</p>
//                     </div>
//                     <h1>{absent.title}</h1>
//                     <h2>{absent.reason}</h2>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className='Tno-absent-message'>
//               <h1>No absent this month...</h1>
//             </div>
//           )}
//         </div>
//       </div>
//       {showModal && (
//         <div className='TAbsentmodal'>
//           <div className='TAbsentmodal-content'>
//             <h2>Add Absent Date</h2>
//             <label>Date: <input type='date' value={newDate.toISOString().substring(0, 10)} onChange={(e) => setNewDate(new Date(e.target.value))}/></label><br></br>
//             <label>Reason: <input type='text' value={newReason} onChange={(e) => setNewReason(e.target.value)}/></label><br></br>
//             <button onClick={handleAddAbsentDate}>Add</button>
//             <button onClick={() => setShowModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TAttendanceCal;


import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import './Attendance.css';

const AttendanceCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [absentDates, setAbsentDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [fetchedReason, setFetchedReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value);
  const [error, setError] = useState('');
  const [selectedAbsent, setSelectedAbsent] = useState(null);
  const collegeCode = sessionStorage.getItem('college_code');
  const studentId = sessionStorage.getItem('student_id');
console.log('Retrieved student ID:', studentId);
  // const studentId = sessionStorage.getItem('studentid') ;

  useEffect(() => {
    fetchAttendanceData(currentMonth.getMonth() + 1, currentMonth.getFullYear());
  }, [currentMonth]);

  const fetchAttendanceData = async (month, year) => {
    setIsLoading(true);
    setError('');
    try {
      if (!studentId) {
        throw new Error('Student ID is undefined or null');
      }
      const response = await fetch(`https://apiaws.onrender.com/fetchattendance?college_code=${collegeCode}&currentMonth=${month}&currentYear=${year}&student_id=${studentId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Fetched attendance data:', data);
      console.log('Student ID:', studentId);
      setAbsentDates(Array.isArray(data.absentDates) ? data.absentDates : []);
      setAttendanceData(Array.isArray(data.attendanceData) ? data.attendanceData : []);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      // console.log('Student ID:', studentId);
      setError('Error fetching attendance data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReasonForDate = async (date) => {
    setIsLoading(true);
    setError('');
    try {
      if (!studentId) {
        throw new Error('Student ID is undefined or null');
      }
      const response = await fetch(`https://apiaws.onrender.com/fetchreason?college_code=${collegeCode}&date=${date}&student_id=${studentId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Fetched reason for date:', date, data);
      setFetchedReason(data.reason);
    } catch (error) {
      console.error('Error fetching reason:', error);
      setFetchedReason('Error fetching reason');
    } finally {
      setIsLoading(false);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const isAbsent = absentDates.some(absent => new Date(absent.date).toDateString() === dateString);
      if (isAbsent) {
        return 'absent';
      } else {
        const foundDate = attendanceData.find(item => item.date === date.toISOString().substring(0, 10));
        if (foundDate && foundDate.status === 0) {
          return 'status-0';
        } else {
          const day = date.getDay();
          if (day === 0) {
            return 'sunday';
          } else if (day === 6) {
            return 'saturday';
          } else {
            return 'weekday';
          }
        }
      }
    }
  };

  const getAbsentDatesForCurrentMonth = () => {
    return absentDates.filter(
      (absent) =>
        new Date(absent.date).getMonth() === currentMonth.getMonth() &&
        new Date(absent.date).getFullYear() === currentMonth.getFullYear()
    );
  };
  
  const absentDatesForCurrentMonth = getAbsentDatesForCurrentMonth();
  const handleDateClick = (absent) => {
    setSelectedAbsent(absent);
    fetchReasonForDate(absent.date);
    setShowReasonModal(true);
  };

  const handleStatusZeroClick = (date) => {
    setSelectedAbsent({ date: date.toISOString().substring(0, 10) });
    fetchReasonForDate(date.toISOString().substring(0, 10));
    setShowReasonModal(true);
  };

  return (
    <div className="Attendancecontainer">
      <div className="Attendancecal">
        <Link to="/StudentList">
          <FontAwesomeIcon icon={faArrowLeft} className="Attendanceicon" />
        </Link>
        <h1>Attendance</h1>
      </div>
      <div className="Attendanceday">
        <div className="Attendancedays">
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            tileContent={({ date, view }) => {
              if (view === 'month' && attendanceData.find(item => item.date === date.toISOString().substring(0, 10) && item.status === 0)) {
                return (
                  <div className="status-zero-date" onClick={() => handleStatusZeroClick(date)}>
                    •
                  </div>
                );
              }
              return null;
            }}
            onClickDay={handleDateClick} 
          />
        </div>
        {showReasonModal && (
          <Modal title="Absent Reason" onClose={() => setShowReasonModal(false)}>
            <div className="Attendanceevents">
              <div className="Attendanceev">
                <div className="Attendanceevent">
                  <div className="Attendancet">
                    <div className="Attendancedot"></div>
                    <p>{new Date(selectedAbsent.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                  </div>
                  <h2>
                    <strong>Reason:</strong> {fetchedReason}
                  </h2>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="attendancere">
          {isLoading ? (
            <p></p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : absentDatesForCurrentMonth.length > 0 ? (
            absentDatesForCurrentMonth.map((absent, index) => (
              <div className="Attendanceevents" key={index} onClick={() => handleDateClick(absent)}>
                <div className="Attendanceev">
                  <div className="Attendanceevent">
                    <div className="Attendancet">
                      <div className="Attendancedot"></div>
                      <p>{new Date(absent.date).toDateString()}</p>
                    </div>
                    <h1>{absent.date}</h1>
                    <h2>{absent.reason}</h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-absent-message">
              <p></p>
            </div>
          )}
        </div>
    </div>
  );
};

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default AttendanceCalendar;
