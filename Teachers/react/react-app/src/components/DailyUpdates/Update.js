// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
// import './Update.css';
// import { Link } from 'react-router-dom';

// function Update() {
//     const [dateSelected, setDateSelected] = useState('');
//     const [timeSelected, setTimeSelected] = useState('');
//     const [classSelected, setClassSelected] = useState('');
//     const [subjectSelected, setSubjectSelected] = useState('');
//     const [chapterName, setChapterName] = useState('');
//     const [coverPoints, setCoverPoints] = useState('');
//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const handleDateChange = (event) => {
//         setDateSelected(event.target.value);
//     };

//     const handleTimeChange = (event) => {
//         setTimeSelected(event.target.value);
//     };

//     const handleClassChange = (event) => {
//         setClassSelected(event.target.value);
//     };

//     const handleSubjectChange = (event) => {
//         setSubjectSelected(event.target.value);
//     };

//     const handleChapterNameChange = (event) => {
//         setChapterName(event.target.value);
//       };
    
//       const handleCoverPointsChange = (event) => {
//         setCoverPoints(event.target.value);
//       };
    
//       const handleSubmit = (event) => {
//         event.preventDefault();
//         setFormSubmitted(true);
//       };
//   return (
//     <div className='TUpdatecontener'>
//     <Link to="/teacher"><FontAwesomeIcon icon={faArrowLeft} className='Tupdatearrow' /></Link>
//     <form onSubmit={handleSubmit}>
//     <div className='Updatecontent'>
//         <div className='updates'>
//             <span><input type="date"  value={dateSelected} onChange={handleDateChange} /></span>
//             <span value={classSelected} onChange={handleClassChange}><select>
//             <option>Class-10C</option>
//             <option>Class-9B</option>
//             <option>Class-8C</option>
//             <option>Class-7A</option>
//             </select></span>
//             <span value={subjectSelected} onChange={handleSubjectChange}><select>
//             <option>English</option>
//             <option>Marathi</option>
//             <option>Hindi</option>
//             </select></span>
//             <span><input type="time" value={timeSelected} onChange={handleTimeChange}/></span>
//         </div>
//         <input className="Updateinput" type="text" placeholder="Mention Chapter Name...." value={chapterName} onChange={handleChapterNameChange}/><br></br>
//         <input className="Updateinput" type="text" placeholder="Mention Cover Points...."  value={coverPoints} onChange={handleCoverPointsChange}/><br></br>
//     </div>
//     <button type="Submit">SUBMIT</button>
//     </form>
//     <div className='Updatebox'>
//     {formSubmitted && (
//     <div className='Updateconten'>
//         <div className='updates'>
//             <span>{dateSelected}</span>
//             <span>{classSelected}</span>
//             <span>{subjectSelected}</span>
//             <span>{timeSelected}</span>
//         </div>
//         <div className='uplodchapter'>
//             <h1><FontAwesomeIcon icon={faStar} className='TUpdateicon'/>{chapterName}</h1>
//             <ol className='u'>
//                <li>{coverPoints}</li>
//             </ol>
//         </div>  
//     </div>
// )}
//     <div className='Updateconten'>
//         <div className='updates'>
//             <span>12 March 2024</span>
//             <span><select>
//             <option>Class-10C</option>
//             <option>Class-9B</option>
//             <option>Class-8C</option>
//             <option>Class-7A</option>
//             </select></span>
//             <span><select>
//             <option>English</option>
//             <option>Marathi</option>
//             <option>Hindi</option>
//             </select></span>
//             <span>09.00 AM</span>
//         </div>
//         <div className='uplodchapter'>
//             <h1><FontAwesomeIcon icon={faStar} className='TUpdateicon'/>A letter to God</h1>
//             <ol className='u'>
//                 <li>Introduction</li>
//                 <li>Basic</li>
//                 <li>Problem set 1</li>
//                 <li>Problem set Answer</li>
//                 <li>Homework</li>
//             </ol>
//         </div>
//     </div>
//     <div className='Updateconten'>
//         <div className='updates'>
//             <span>12 March 2024</span>
//             <span><select>
//             <option>Class-10C</option>
//             <option>Class-9B</option>
//             <option>Class-8C</option>
//             <option>Class-7A</option>
//             </select></span>
//             <span><select>
//             <option>English</option>
//             <option>Marathi</option>
//             <option>Hindi</option>
//             </select></span>
//             <span>09.00 AM</span>
//         </div>
//         <div className='uplodchapter'>
//             <h1><FontAwesomeIcon icon={faStar} className='TUpdateicon'/>Chemical equation</h1>
//             <ol className='u'>
//                 <li>Introduction</li>
//                 <li>Basic</li>
//                 <li>Problem set 1</li>
//                 <li>Problem set Answer</li>
//                 <li>Homework</li>
//             </ol>
//         </div>   
//     </div>
//     <div className='Updateconten'>
//         <div className='updates'>
//             <span>12 March 2024</span>
//             <span><select>
//             <option>Class-10C</option>
//             <option>Class-9B</option>
//             <option>Class-8C</option>
//             <option>Class-7A</option>
//             </select></span>
//             <span><select>
//             <option>English</option>
//             <option>Marathi</option>
//             <option>Hindi</option>
//             </select></span>
//             <span>09.00 AM</span>
//         </div>
//         <div className='uplodchapter'>
//             <h1><FontAwesomeIcon icon={faStar} className='TUpdateicon'/> Nationalism in India</h1>
//             <ol className='u'>
//                 <li>Introduction</li>
//                 <li>Basic</li>
//                 <li>Problem set 1</li>
//                 <li>Problem set Answer</li>
//                 <li>Homework</li>
//             </ol>
//         </div>  
//     </div>
//     </div>
//     </div>
//   );
// }
// export default Update;






import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import './Update.css';
import { Link } from 'react-router-dom';

function Update() {
  const [dateSelected, setDateSelected] = useState('');
  const [timeSelected, setTimeSelected] = useState('');
  const [classSelected, setClassSelected] = useState('');
  const [subjectSelected, setSubjectSelected] = useState('');
  const [chapterSelected, setChapterSelected] = useState('');
  const [pointSelected, setPointSelected] = useState('');
  const [classList, setClassList] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [points, setPoints] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittedData, setSubmittedData] = useState({});
  const [subjectName, setSubjectName] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [pointName, setPointName] = useState('');

  useEffect(() => {
    const college_code = sessionStorage.getItem('college_code');
    const teacher_code = sessionStorage.getItem('teacher_code');
    fetch(`https://apiaws.onrender.com/teacher_classlist?college_code=${college_code}&teacher_code=${teacher_code}`)
      .then(response => response.json())
      .then(data => {
        setClassList(data.classList);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    // Automatically set the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toTimeString().split(' ')[0];
    setDateSelected(formattedDate);
    setTimeSelected(formattedTime);
  }, []);

  useEffect(() => {
    if (subjectSelected) {
      const college_code = sessionStorage.getItem('college_code');
      fetch(`https://apiaws.onrender.com/chapter_points?college_code=${college_code}&subject_code_prefixed=${subjectSelected}`)
        .then(response => response.json())
        .then(data => {
          setChapters(data);
          const subject = classList.find(cls => cls.subject_code_prefixed === subjectSelected);
          if (subject) {
            setSubjectName(subject.subject_name);
          }
        })
        .catch(error => setError(error));
    }
  }, [subjectSelected, classList]);

  useEffect(() => {
    if (chapterSelected) {
      const selectedChapter = chapters.find(chapter => chapter.chapter_id === chapterSelected);
      if (selectedChapter) {
        setPoints(selectedChapter.points);
        setChapterName(selectedChapter.chapter_name);
      }
    }
  }, [chapterSelected, chapters]);

  useEffect(() => {
    if (pointSelected) {
      const selectedPoint = points.find(point => point.point_id === pointSelected);
      if (selectedPoint) {
        setPointName(selectedPoint.point_name);
      }
    }
  }, [pointSelected, points]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      stand: classSelected.split('-')[1], 
      division: classSelected.split('-')[2], 
      subject_code_prefixed: subjectSelected, 
      chapter_id: chapterSelected, 
      point_ids: [pointSelected], 
      date: dateSelected,
      time: timeSelected,
      teacher_code: "T10"
    };
    const college_code = sessionStorage.getItem('college_code');
    fetch(`https://apiaws.onrender.com/teacher_dailyupdate?college_code=${college_code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFormSubmitted(true);
          setSubmittedData({
            dateSelected,
            timeSelected,
            classSelected,
            subjectName,
            chapterName,
            pointName
          });
          resetForm();
        } else {
          setError({ message: 'Submission failed' });
        }
      })
      .catch(error => setError(error));
  };

  const resetForm = () => {
    setClassSelected('');
    setSubjectSelected('');
    setChapterSelected('');
    setPointSelected('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='TUpdatecontener'>
      <Link to="/teacher"><FontAwesomeIcon icon={faArrowLeft} className='Tupdatearrow' /></Link>
      <form onSubmit={handleSubmit}>
        <div className='Updatecontent'>
          <div className='updates'>
            <span><input value={dateSelected} onChange={(e) => setDateSelected(e.target.value)} /></span>
            <span><input value={timeSelected} onChange={(e) => setTimeSelected(e.target.value)} /></span>
          </div>
          <div className='updates2'>
            <span>
              <select value={classSelected} onChange={(e) => setClassSelected(e.target.value)}>
                <option value="" disabled>Select Class</option>
                {classList.map((cls, index) => (
                  <option key={index} value={`Class-${cls.stand}-${cls.division}`}>{`Class-${cls.stand}${cls.division}`}</option>
                ))}
              </select>
            </span>
            <span>
              <select value={subjectSelected} onChange={(e) => setSubjectSelected(e.target.value)}>
                <option value="" disabled>Select Subject</option>
                {classList.map((cls, index) => (
                  <option key={index} value={cls.subject_code_prefixed}>{cls.subject_name}</option>
                ))}
              </select>
            </span>
          </div>
          <div className='updates2'>
            <span>
              <select value={chapterSelected} onChange={(e) => setChapterSelected(e.target.value)}>
                <option value="" disabled>Select Chapter</option>
                {chapters.map((chapter, index) => (
                  <option key={index} value={chapter.chapter_id}>{chapter.chapter_name}</option>
                ))}
              </select>
            </span>
            <span>
              <select value={pointSelected} onChange={(e) => setPointSelected(e.target.value)}>
                <option value="" disabled>Select Point</option>
                {points.map((point, index) => (
                  <option key={index} value={point.point_id}>{point.point_name}</option>
                ))}
              </select>
            </span>
          </div>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      <div className='Updatebox'>
        {formSubmitted && (
          <div className='Updateconten'>
            <div className='updates'>
              <span>{submittedData.dateSelected}</span>
              <span>{submittedData.timeSelected}</span>
            </div>
            <div className='updates3'>
              <span>{submittedData.classSelected}</span>
              <span>{submittedData.subjectName}</span>
            </div>
            <div className='uplodchapter'>
              <h1><FontAwesomeIcon icon={faStar} className='TUpdateicon' />{submittedData.chapterName}</h1>
              <ol className='u'>
                <li>{submittedData.pointName}</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Update;
