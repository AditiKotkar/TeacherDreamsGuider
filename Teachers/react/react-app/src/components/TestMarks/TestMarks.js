// TestMarks.js
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TestMarks.css';

const TestMarks = () => {
  const [students, setStudents] = useState([]);
  const [unitTests, setUnitTests] = useState([]);
  const [selectedUnitTest, setSelectedUnitTest] = useState('');
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const college_code = sessionStorage.getItem('college_code');
  const teacher_code = sessionStorage.getItem('teacher_code');

  useEffect(() => {
    fetchClassList();
    fetchUnitTestNames();
  }, []);

  useEffect(() => {
    if (classList.length > 0) {
      setSelectedClass(classList[0].stand);
      setSelectedDivision(classList[0].division);
    }
  }, [classList]);

  useEffect(() => {
    if (selectedClass && selectedDivision) {
      fetchStudentData();
    }
  }, [selectedClass, selectedDivision]);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`https://apiaws.onrender.com/students?college_code=${college_code}&stand=${selectedClass}&division=${selectedDivision}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching student information:', error);
    }
  };

  const fetchUnitTestNames = async () => {
    try {
      const response = await fetch('https://apiaws.onrender.com/getUnitTestname');
      const data = await response.json();
      setUnitTests(data);
    } catch (error) {
      console.error('Error fetching unit test names:', error);
    }
  };

  const fetchClassList = async () => {
    try {
      const response = await fetch(`https://apiaws.onrender.com/teacher_classlist?teacher_code=${teacher_code}&college_code=${college_code}`);
      const data = await response.json();
      if (data.classList) {
        setClassList(data.classList);
      } else {
        console.error('Fetched data does not contain classList:', data);
      }
    } catch (error) {
      console.error('Error fetching class list:', error);
    }
  };

  const handleClassDivisionChange = (event) => {
    const [stand, division] = event.target.value.split('-');
    setSelectedClass(stand);
    setSelectedDivision(division);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleUnitTestChange = (event) => {
    setSelectedUnitTest(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedUnitTest) {
      console.error('No unit test selected');
      return;
    }
    const marksData = students.map(student => ({
      roll_no: student.roll_no,
      marks: document.querySelector(`#marks-${student.roll_no}`).value
    }));
    try {
      console.log('Submitting marks data:', {
        college_code,
        stand: selectedClass,
        division: selectedDivision,
        unit_test_id: selectedUnitTest,
        subject_id: selectedSubject,
        marksData
      });
      const response = await fetch(`https://apiaws.onrender.com/insertunitmarks?college_code=${college_code}&stand=${selectedClass}&division=${selectedDivision}&unit_test_id=${selectedUnitTest}&subject_id=${selectedSubject}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marksData),
      });

      if (response.ok) {
        console.log('Marks submitted successfully');
      } else {
        const errorText = await response.text();
        console.error('Error submitting marks:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error submitting marks:', error);
    }
  };

  return (
    <div className="TestMarksconten">
      <div className='TestMarksheader'>
        <Link to="/student"><FontAwesomeIcon icon={faArrowLeft} className='Attendanceicon' /></Link>
        <h1>Fill Marks</h1>
      </div>
      <div className='TestMarks2conen'>
        <div className='TestMarksinfo'>
          <select id="classDivisionSelect" onChange={handleClassDivisionChange} value={`${selectedClass}-${selectedDivision}`}>
            {classList.map(cls => (
              <option key={`${cls.stand}-${cls.division}`} value={`${cls.stand}-${cls.division}`}>{`${cls.stand}-${cls.division}`}</option>
            ))}
          </select>
          <select id="subjectSelect" onChange={handleSubjectChange} value={selectedSubject}>
            {classList.filter(cls => cls.stand === selectedClass && cls.division === selectedDivision).map(cls => (
              <option key={cls.subject_code_prefixed} value={cls.subject_code_prefixed}>{cls.subject_name}</option>
            ))}
          </select>
          <select id="examSelect" onChange={handleUnitTestChange} value={selectedUnitTest}>
            {unitTests.map(test => (
              <option key={test.unit_test_id} value={test.unit_test_id}>{test.unit_test_name}</option>
            ))}
          </select>
        </div>
        <div className='TestMarks3content'>
          <div className='TestMarksRNM'>
            <h1>Roll Number</h1>
            <h1>Students Name</h1>
            <h1>Marks</h1>
          </div>
          {students.map(student => (
            <div key={student.roll_no} className='TestMarksbox'>
              <h1>{student.roll_no}</h1>
              <h1>{student.Name}</h1>
              <input type="text" id={`marks-${student.roll_no}`} placeholder="......" />
            </div>
          ))}
          <div className='TestMarks4content'>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMarks;
