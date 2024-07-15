// import React, {useEffect, useState} from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import './Profilepage.css';
// import { Link} from 'react-router-dom';
// const Profilepage = () => {
//     const [student, setStudent] = useState([null]);

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/student-info');
//         const data = await response.json();
//         setStudent(data[0]);
//       } catch (error) {
//         console.error('Error fetching student information:', error); 
//       }
//     };

//     fetchStudentData();
//   }, []);

//     return (
//     <div className='profile-content'>
//         <div className='profile-Profile'>
//         <Link to="/teacher"><FontAwesomeIcon icon={faArrowLeft} className="profile-icon" /> </Link>
//             <h1 className='profile-ProfileName'>Profile</h1>
//         </div>
//         <div className='profile-IMG'>{student.photo}</div>
        
//         <div className='profile-data'>
//         <div className='profile-Dtext'>
//         {student && (
//         <form>
//         <div>
//             <label>Full Name : </label>
//             <input type="text" name="stud_name" placeholder="profileName" value={student.stud_name || ''} readOnly />
//         </div>
//         <div>
//             <label>Education : </label>
//             <input type="text" name="stud_div" placeholder="Division" value={student.stud_rollno || ''} readOnly/>
//         </div>
//         <div>
//             <label>Subject : </label>
//             <input type="text" name="stud_div" placeholder="Division" value={student.stud_rollno || ''} readOnly/>
//         </div>
//         <div>
//             <label>ID Number : </label>
//             <input type="text" name="stud_div" placeholder="Division" value={student.stud_rollno || ''} readOnly/>
//         </div>
//         <div>
//             <label>Mobile Number : </label>
//             <input type="text" name="stud_phoneno" placeholder="Phone Number" value={student.stud_phoneno || ''} readOnly/>
//         </div>
//         <div>
//             <label>Birth Date : </label>
//             <input type="date" name="stud_dob" placeholder="Date of Birth" value={student.stud_dob || ''} readOnly/>
//         </div>
//         <div>
//             <label>Email Id : </label>
//             <input type="text" name="Mail" placeholder="Email" value={student.username || ''} readOnly/>
//         </div>
//         </form>
//     )}
//         </div>
//         </div>
//     </div>
//     );       
// };

// export default Profilepage;




import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Profilepage.css';
import { Link } from 'react-router-dom';

const Profilepage = () => {
  const [teacher, setTeacher] = useState(null);
  const teacher_code = sessionStorage.getItem('teacher_code');
  const college_code = sessionStorage.getItem('college_code');
  const tname = sessionStorage.getItem('tname'); 

  useEffect(() => {
    const fetchTeacherData = async () => {
        console.log(teacher_code, college_code);
        try {
            const response = await fetch(`https://apiaws.onrender.com/teacher_profile?college_code=${college_code}&teacher_code=${teacher_code}`, {
                method: 'GET',
            });
            const data = await response.json();
            setTeacher(data.teacherData); 
            console.log('Fetched Teacher Data:', data.teacherData); 
        } catch (error) {
            console.error('Error fetching teacher information:', error); 
        }
    };
    fetchTeacherData();
  }, [teacher_code, college_code]);


    return (
        <div className='profile-content'>
            <div className='profile-Profile'>
                <Link to="/teacher">
                    <FontAwesomeIcon icon={faArrowLeft} className="profile-icon" /> {' '}
                </Link>
                <h1 className='profile-ProfileName'>Profile</h1>
            </div>
            <div className='profile-IMG'>
                {teacher?.teacher_profile && (
                    <img src={`data:image/jpeg;base64,${teacher.teacher_profile}`} alt="Profile" onError={(e) => e.target.src = '/fallback-image.jpg'} />
                )}
            </div>
            <div className='profile-data'>
                <div className='profile-Dtext'>
                    {teacher ? (
                        <form>
                            <div>
                                <label>Full Name : </label>
                                <input type="text" name="stud_name" placeholder="profileName" value={teacher.tname || ''} readOnly />
                            </div>
                            <div>
                                <label>Education : </label>
                                <input type="text" name="stud_div" placeholder="Division" value={teacher.teacher_education || ''} readOnly />
                            </div>
                            <div>
                                <label>Subjects : </label>
                                <input type="text" name="stud_div" placeholder="Division" value={teacher.subjects?.join(', ') || ''} readOnly />
                            </div>
                            <div>
                                <label>ID Number : </label>
                                <input type="text" name="stud_div" placeholder="Division" value={teacher.teacher_code || ''} readOnly />
                            </div>
                            <div>
                                <label>Mobile Number : </label>
                                <input type="text" name="stud_phoneno" placeholder="Phone Number" value={teacher.mobileno || ''} readOnly />
                            </div>
                            <div>
                                <label>Birth Date : </label>
                                <input type="date" name="stud_dob" placeholder="Date of Birth" value={teacher.date_of_birth ? teacher.date_of_birth.split('T')[0] : ''} readOnly />
                            </div>
                            <div>
                                <label>Email Id : </label>
                                <input type="text" name="Mail" placeholder="Email" value={teacher.teacher_email || ''} readOnly />
                            </div>
                        </form>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );       
};

export default Profilepage;
