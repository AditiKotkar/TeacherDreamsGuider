// import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
// import { Link} from 'react-router-dom';
// import './Homework.css';

// //IMG
// import English from './images/English.png';
// import Marathi from './images/Marathi.png';
// import Hindi from './images/hindi.png';
// import Science from './images/Science.png';
// import Mathematic from './images/Mathematic.png';
// import History from './images/History.png';
// import Art from './images/Art.png';
// import Sports from './images/Sports.png'

// const home = () => {

//   return (
//     <div className="homecontene">
//      <div className="homebg">
//      <div className='homeicon'>
//      <Link to="/student"><FontAwesomeIcon icon={faArrowLeft} className='profile-icon' /> </Link>
//     </div>
//         <div className="homeName"> 
//         <h1 className='homework'>Homework</h1>
//         </div>
//         <div className="homeimg-1"></div>          
//      </div>
//             <div className="homecon">
//             <Link to="/mainsub">
//             <div className="homecontener">
//                 <div className="homeimg">
//                     <img src={English} alt="Homework" />
//                 </div>
//                 <h1>English</h1>
//             </div>
//             </Link>
//             <Link to="/mainsub">
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={Marathi} alt="Syllabus" />
//             </div>
//             <h1>Marathi</h1>
//         </div>
//         </Link>
//         <Link to="/mainsub">
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={Hindi} alt="Chat" />
//             </div>
//             <h1>Hindi</h1>
//         </div> 
//         </Link>
//         <Link to="/mainsub">   
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={Science} alt="Attendence_Sheet" />
//             </div>
//             <h1>Science</h1>
//         </div>
//         </Link>
//         <Link to="/mainsub">
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={Mathematic} alt="Video_Lecture" />
//             </div>
//             <h1>Mathematic</h1>
//         </div> 
//         </Link>
//         <Link to="/mainsub"> 
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={History} alt="QPaper"/>
//             </div>
//             <h1>History</h1>
//         </div>
//         </Link>
//         <Link to="/mainsub">
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={Art} alt="Calender"/>
//             </div>
//             <h1>Art</h1>
//         </div>
//         </Link>
//         <Link to="/mainsub"> 
//         <div className="homecontener">
//             <div className="homeimg">
//                 <img src={Sports} alt="Feedback" />
//             </div>
//             <h1>Sports</h1>
//         </div>
//         </Link>
//         </div>
//             </div>
//   );
// }
// export default home;




import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Homework.css';

const Homework = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const stand = location.state?.stand || sessionStorage.getItem('stand');
  const teacher_code = location.state?.teacher_code || sessionStorage.getItem('teacher_code');

  useEffect(() => {
    console.log({
      stand,
      teacher_code
    });
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
      
        const response = await fetch(`https://apiaws.onrender.com/subjects?standard=${stand}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubjects(data);
        sessionStorage.setItem('stand', stand);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };
    if (stand) {
      fetchSubjects();
    }
  }, [stand]);

  const handleSubjectClick = (subjectId) => {
    sessionStorage.setItem('subject_id', subjectId);
  };

  return (
    <div className="homecontene">
      <div className="homebg">
        <div className="homeicon">
          <Link to="/student">
            <FontAwesomeIcon icon={faArrowLeft} className="profile-icon" />
          </Link>
        </div>
        <div className="homeName">
          <h1 className="homework">Homework</h1>
        </div>
        <div className="homeimg-1"></div>
      </div>
      <div className="homecon">
        {!loading && !error && subjects.map(subject => (
          <Link
            to={`/Homework/${subject.subject_name.toLowerCase().replace(/\s+/g, '-')}`}
            key={subject.subject_code_prefixed }
            title={subject.subject_name}
            state={{ teacher_code: subject.subject_code_prefixed }}
            onClick={() => handleSubjectClick(subject.subject_code_prefixed)}
          >
            <div className="homecontener">
              <div className="homeimg">
                <img src={`data:image/jpeg;base64, ${subject.image}`} alt={subject.subject_name} />
              </div>
              <h1>{subject.subject_name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homework;
