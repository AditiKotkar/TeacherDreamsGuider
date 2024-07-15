import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './pending.css';

Modal.setAppElement('#root');

const usePendingAssignments = () => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        const collegeCode = sessionStorage.getItem('college_code');
            const teacherCode = sessionStorage.getItem('teacher_code');
            const Standard = sessionStorage.getItem('selectedClass');
            const Division = sessionStorage.getItem('selectedDivision');
            const subject_id = sessionStorage.getItem('subject_id');

        console.log("Fetching data with parameters: ", {
          collegeCode,
          teacherCode,
          Standard,
          Division,
          subject_id
        });

        const response = await fetch(`https://apiaws.onrender.com/teacher_pending?college_code=${collegeCode}&teacher_code=${teacherCode}&Standard=${Standard}&Division=${Division}&subject_id=${subject_id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No pending assignments found.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        
        const data = await response.json();
        console.log("API Pending data: ", data);
        if (Array.isArray(data)) {
          setPendingAssignments(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching pending assignments: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAssignments();
  }, []);

  return { pendingAssignments, error, loading };
};

const Pending = () => {
  const { pendingAssignments, error, loading } = usePendingAssignments();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // const handleView = (imageUrl) => {
  //   console.log('Viewing image URL:', imageUrl);
  //   if (imageUrl.startsWith('data:image/jpeg;base64,')) {
  //     setSelectedImage(imageUrl);
  //     setModalIsOpen(true);
  //   } else {
  //     console.error('Invalid image URL for viewing');
  //   }
  // };
  const handleView = (imageUrl) => {
    if (imageUrl.startsWith('data:image/jpeg;base64,')) {
      setSelectedImage(imageUrl);
      setModalIsOpen(true);
    } else {
      console.error('Invalid image URL for viewing');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='Submittedcontent'>
      {pendingAssignments.length > 0 ? (
        pendingAssignments.map((assignment, index) => (
          <div className="Scontener2" key={index}>
            <div className="Sbuten">
              <div className="but2">
                <h1 className="Senglish">{assignment.subject_name}</h1>
                <div className="Sbuttons2">
                <span onClick={() => handleView(`data:image/jpeg;base64,${assignment.hpimage[0]}`)}>View</span>
                <span onClick={() => handleView(`data:image/jpeg;base64,${assignment.hsimages[0]}`)}>Approve</span>
                </div>
              </div>
            </div>
            <div className="Scontener3">
              <h1 className="Sassign">Assignment {assignment.homeworksubmitted_id}</h1>
              <div className="SData">
                <div className="Sbord">
                  <ul>
                    <li>Homework Date: {new Date(assignment.date_of_given_submitted).toLocaleDateString()}</li>
                    <li>Submission Date: {new Date(assignment.date_of_to_submit).toLocaleDateString()}</li>
                    <li>Student Name: {assignment.studentid}</li>
                    <li>Class: {assignment.Standard}</li>
                  </ul>
                </div>
              </div>
              <div className="Scontener4">
                <h1 className="Sdescription">Description</h1>
                <span>{assignment.pending_description}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="View Assignment Image"
        className="Modal"
        overlayClassName="Overlay"
      >
      {selectedImage && (
        <div className='ViewImg'>
          <button className="ViewImgButton" onClick={() => setModalIsOpen(false)}>Close</button>
           <img className="viewimg" src={selectedImage} alt="Assignment" style={{ width: '100%' }} />
        </div>
        )}
      </Modal>
    </div>
  );
}

export default Pending;
