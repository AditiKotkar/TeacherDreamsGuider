import React, {useState} from 'react';
import './Attendancecard.css';
import { Link } from 'react-router-dom';
function attendence () {
  return (
    <div className="Thomemaincontener">
    <div className="Thomemainbut1">
        <div className="Thomemainbuttons1">
          <Link to="/TackAttendance"><button>Tack Attendance</button></Link>
          <Link to="/StudentList"><button>Record Attendance </button></Link>
          <Link to="/AttendanceSubmit"><button>Previous Record</button></Link>
        </div>
    </div>
    </div>    
  );
}

export default attendence;
