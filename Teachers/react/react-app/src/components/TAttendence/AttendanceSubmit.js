import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import './AttendanceSubmit.css';

function AttendanceSubmit() {
  const location = useLocation();
  const { present, absent, leave } = location.state || { present: 0, absent: 0, leave: 0 };

  return (
    <div className="Submitcontener">
      <div className='Submitlines'></div>
      <div className='SubmitHeader'>
        <Link to="/TackAttendance"><FontAwesomeIcon icon={faLessThan} className='Submiticon' /></Link>
        <h1>Tue , 15 March 2024</h1>
        <FontAwesomeIcon icon={faGreaterThan} className='Submiticon' />
      </div>
      <div className='Submitlines'></div>
      <div className='Submitedcon'>
        <div className='SubmitLeft'>
          <h1>Date</h1>
          <ul>
            <li>12/05/2024</li>
          </ul>
        </div>
        <div className='SubmitRight'>
          <h1>Class</h1>
          <div className='SubmitBox'>
            <Link to="/AttendanceCal"><h1>8 - B</h1></Link>
            <div className='SubmitAttendance'>
              <h1>Present<div className='TotalPresent'>{present}</div></h1>
              <h1>Absent<div className='TotalAbsent'>{absent}</div></h1>
              <h1>Leave<div className='TotalLeave'>{leave}</div></h1>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default AttendanceSubmit;