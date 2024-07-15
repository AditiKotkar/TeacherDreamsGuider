import React, { useEffect, useState } from 'react';
import './Created.css';

function Created() {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [classList, setClassList] = useState([]);
  const [pointName, setPointName] = useState('');
  const [homeworkDate, setHomeworkDate] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherCode = sessionStorage.getItem('teacher_code');
        const collegeCode = sessionStorage.getItem('college_code');
        if (!teacherCode || !collegeCode) {
          throw new Error("Teacher code or college code not found in sessionStorage");
        }

        const response = await fetch(`https://apiaws.onrender.com/teacher_classlist?teacher_code=${teacherCode}&college_code=${collegeCode}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const subjects = [...new Set(data.classList.map(item => item.subject_name))];
        const classes = [...new Set(data.classList.map(item => item.stand))];
        const divisions = [...new Set(data.classList.map(item => item.division))];

        setSubjects(subjects);
        setClasses(classes);
        setDivisions(divisions);
        setClassList(data.classList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = (e) => {
    sessionStorage.setItem('selectedClass', e.target.value);
    console.log('Selected Class:', e.target.value);
  };

  const handleDivisionChange = (e) => {
    sessionStorage.setItem('selectedDivision', e.target.value);
    console.log('Selected Division:', e.target.value);
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    const selectedSubjectDetails = classList.find(item => item.subject_name === selectedSubject);
    if (selectedSubjectDetails) {
      sessionStorage.setItem('selectedSubject', selectedSubject);
      sessionStorage.setItem('subject_id', selectedSubjectDetails.subject_code_prefixed);
      sessionStorage.setItem('Standard', selectedSubjectDetails.stand);
      sessionStorage.setItem('Division', selectedSubjectDetails.division);
      sessionStorage.setItem('subject_name', selectedSubjectDetails.subject_name);
      console.log('Selected Subject Details:', selectedSubjectDetails);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      const teacherCode = sessionStorage.getItem('teacher_code');
      const collegeCode = sessionStorage.getItem('college_code');
      if (!teacherCode || !collegeCode) {
        throw new Error("Teacher code or college code not found in sessionStorage");
      }

      const payload = {
        point_name: pointName,
        homework_date: homeworkDate,
        submission_date: submissionDate,
        description: description,
        subject_id: sessionStorage.getItem('subject_id'),
        Division: sessionStorage.getItem('selectedDivision'),
        date_of_given: homeworkDate,
        homework_content: description,
        standred: sessionStorage.getItem('Standard'),
        date_of_creation: new Date().toISOString().split('T')[0],
        image: imageUrl || "",
        teacher_id: teacherCode,
        college_code: collegeCode,
      };

      console.log('Payload:', payload);

      const missingFields = [];
      for (const [key, value] of Object.entries(payload)) {
        if (!value) {
          missingFields.push(key);
        }
      }
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      const createHomeworkResponse = await fetch(`https://apiaws.onrender.com/createHomework?college_code=${collegeCode}&teacher_id=${teacherCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!createHomeworkResponse.ok) {
        const errorText = await createHomeworkResponse.text();
        throw new Error(`Failed to create homework: ${errorText}`);
      }

      console.log('Homework created successfully');
      setPointName('');
      setHomeworkDate('');
      setSubmissionDate('');
      setDescription('');
      setFile(null);
      setImageUrl('');
      sessionStorage.removeItem('selectedClass');
      sessionStorage.removeItem('selectedDivision');
      sessionStorage.removeItem('subject_id');
    } catch (error) {
      console.error('Error creating homework:', error);
    }
  };

  return (
    <div className='Createdcontent'>
      <div className='Createdteacher'>
        <div className='CreatedSelect'>
          <span>
            <select onChange={handleSubjectChange} value={sessionStorage.getItem('selectedSubject') || ''} aria-label="Select subject">
              <option value="" disabled>Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </span>
          <span>
            <select onChange={handleClassChange} value={sessionStorage.getItem('selectedClass') || ''} aria-label="Select class">
              <option value="" disabled>Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </span>
          <span>
            <select onChange={handleDivisionChange} value={sessionStorage.getItem('selectedDivision') || ''} aria-label="Select division">
              <option value="" disabled>Select Division</option>
              {divisions.map(division => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </span>
        </div>
        <div className="field name">
          <input className='Createdconten1' type="text" placeholder="Point Name" value={pointName} onChange={(e) => setPointName(e.target.value)} required />
        </div>
        <div className="field name">
          <input className='Createdconten1' type="date" placeholder="Homework Date" value={homeworkDate} onChange={(e) => setHomeworkDate(e.target.value)} required />
        </div>
        <div className="field name">
          <input className='Createdconten1' type="date" placeholder="Submission Date" value={submissionDate} onChange={(e) => setSubmissionDate(e.target.value)} required />
        </div>
        <div className="field textarea">
          <h2>Description</h2>
          <textarea className='Createdconten2' placeholder="Type here....." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className='Createdbutons'>
          <input type="file" onChange={handleFileChange} aria-label="Upload file" />
          <button className='CreatedUpload' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Created;
