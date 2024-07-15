/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import CollegeCodeEntry from './components/CollegeCodeEntry';
import StudentLogin from './components/studentlogin'; 
import TeacherStudentDashbord from './components/TeacherStudentDashbord';
import Profilepage from './components/Profilepage';
import ThomeMainsub from './components/Dailyhomework/ThomeMainsub';
import AttendanceCalendar from './components/TAttendence/AttendanceCalendar';
import Attendancecard from './components/TAttendence/Attendancecard';
import TackAttendance from './components/TAttendence/TackAttendance';
import DailyUpdates from './components/DailyUpdates/Update';
import AttendanceSubmit from './components/TAttendence/AttendanceSubmit';
import StudentList from './components/TAttendence/studentlist';
import TChatbox from './components/TChat/TChatbox';
import TChat from './components/TChat/TChat';
import Report from './components/Report/Report';
import Reportrecord from './components/Report/Reportrecord';
import TestMarks from './components/TestMarks/TestMarks';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CollegeCodeEntry />} />
      <Route path="login" element={<StudentLogin />} /> 
      <Route path="teacher" element={<TeacherStudentDashbord />} />
      <Route path="Teacherprofile" element={<Profilepage />} />
      <Route path="Homework" element={<ThomeMainsub />} />
      <Route path="AttendanceCalendar" element={<AttendanceCalendar />}/>
      <Route path="attendence" element={<Attendancecard/>} />
      <Route path="TackAttendance" element={<TackAttendance />} />
      <Route path="dailyupdate" element={<DailyUpdates />} />
      <Route path="AttendanceSubmit" element={<AttendanceSubmit/>} />
      <Route path="StudentList" element={<StudentList />} />
      <Route path="chat" element={<TChatbox/>}/>
      <Route path="TChat" element={<TChat/>}/>
      <Route path="reports" element={<Report/>} />
      <Route path="Reportrecord" element={<Reportrecord />} />
      <Route path="testmarks" element={<TestMarks />} />

    </Routes>
  </BrowserRouter>
);
reportWebVitals();