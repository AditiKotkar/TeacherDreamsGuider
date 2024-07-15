import React, {useEffect, useState } from 'react';
import { faEllipsisVertical, faTimes, faGear, faHouse, faCircleInfo, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {  faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate} from 'react-router-dom';
import './TeacherStudentDashbord.css';

const TeacherStudentDashbord = () => {
    const [isActive, setIsActive] = useState(false);
    const [teacher, setTeacher] = useState([null]);
    const [dashboardItems, setDashboardItems] = useState([]);
    const teacher_code = sessionStorage.getItem('teacher_code');
    const college_code = sessionStorage.getItem('college_code');
    const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      console.log(teacher_code, college_code);
      try {
          const response = await fetch(`https://apiaws.onrender.com/teacher_profile?college_code=${college_code}&teacher_code=${teacher_code}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          });
          const data = await response.json();
          setTeacher(data.teacherData); 
          sessionStorage.setItem('stand', data.teacherData.standard);
                sessionStorage.setItem('division', data.teacherData.division);
                sessionStorage.setItem('subjects', JSON.stringify(data.teacherData.subjects));
          console.log('Fetched Teacher Data:', data.teacherData); 
          sessionStorage.setItem('stand', data.stand);
          sessionStorage.setItem('division', data.division);
      } catch (error) {
          console.error('Error fetching teacher information:', error); 
      }
  };
    const fetchDashboardData = async () => {
      const teacher_code = sessionStorage.getItem('teacher_code');
      try {
        const response = await fetch(`https://apiaws.onrender.com/teacher_dashboard?college_code=${college_code}&teacher_code=${teacher_code}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDashboardItems(data);
      } catch (error) {
        console.error('Error fetching dashboard information:', error);
      }
    };
    if (college_code) {
      fetchTeacherData();
      fetchDashboardData();
    }
  }, [college_code]);


    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const handleItemClick = (title, subjectId) => {
    const formattedTitle = title.replace(/\s+/g, '');
    const teacher_code = sessionStorage.getItem('teacher_code');
    navigate(`/${formattedTitle.toLowerCase().replace(/\s+/g, '-')}`, {
      state: {
        teacher_code: sessionStorage.getItem('teacher_code'),
        division: sessionStorage.getItem('division'),
        stand: sessionStorage.getItem('stand'),
        college_code: college_code,
        subject_name: formattedTitle,
        subject_id: subjectId,
      }
    });
  };

  return (
    <div className="contene">
     <div className="bgimg">
     {teacher && (  
        <div className="img-1">
                    <img src={`data:image/jpeg;base64,${teacher.teacher_profile}`} alt="Profile" className="img-1" onError={(e) => e.target.src = '/fallback-image.jpg'} />
        </div>
     )}
     {teacher && ( 
        <div className="Name">
          <span className="hiSaiChudhari">Hi, {teacher.tname}</span><br></br>
          <span className="rollNumber1">ID Number : {teacher.teacher_code}</span><br></br>
          <span className="class12Std">Subject : {teacher.subjects?.join(', ')}</span>
        </div>
     )}
        <nav className="navbar">
          <div className="max-width">
            <ul className={`menu ${isActive ? 'active' : ''}`}>
              <li><FontAwesomeIcon icon={faHouse} /><a href="#Home" className="menu-btn">Home</a></li>
              <li><FontAwesomeIcon icon={faCircleUser} /><Link to="/TeacherProfile" className="menu-btn">Profile</Link></li>
              <li><FontAwesomeIcon icon={faCircleInfo} /><a href="#About" className="menu-btn">About School</a></li>
              <li><FontAwesomeIcon icon={faGear} /><a href="#Setting" className="menu-btn">Setting</a></li>
              <li><FontAwesomeIcon icon={faArrowRightFromBracket} /><a href="#Logout" className="menu-btn">Logout</a></li>
            </ul>
            <div className="menu-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={isActive ? faTimes : faEllipsisVertical} />
            </div>
          </div>
        </nav>          
     </div>
            <div className="con">
            {dashboardItems.map(item => (
          <div className="contener" key={item.id} onClick={() => handleItemClick(item.title)}>
            <div className="img">
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
            </div>
            <h1>{item.title}</h1>
          </div>
        ))}
        </div>
      </div>
  );
}
export default TeacherStudentDashbord;

