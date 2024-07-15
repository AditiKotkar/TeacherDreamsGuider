import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Ensure you have installed react-modal
import './Submitted.css';

Modal.setAppElement('#root');

const useFetchSubmitted = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collegeCode = sessionStorage.getItem('college_code');
        const teacherCode = sessionStorage.getItem('teacher_code');
        const Standard = sessionStorage.getItem('selectedClass');
        const Division = sessionStorage.getItem('selectedDivision');
        const subject_id = sessionStorage.getItem('subject_id');

        const response = await fetch(`https://apiaws.onrender.com/getsubmitted_homework?college_code=${collegeCode}&teacher_code=${teacherCode}&Standard=${Standard}&Division=${Division}&subject_id=${subject_id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No pending assignments found.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setSubmittedData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { submittedData, error, loading };
};

const Submitted = () => {
  const { submittedData, error, loading } = useFetchSubmitted();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleView = (imageUrl) => {
    console.log('Viewing image URL:', imageUrl);
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
      {submittedData.length > 0 ? (
        submittedData.map((submitted, index) => (
          <div className="Scontener2" key={index}>
            <div className="Sbuten">
              <div className="but2">
                <h1 className="Senglish">{submitted.subject_name}</h1>
                <div className="Sbuttons2">
                  <span onClick={() => handleView(`data:image/jpeg;base64,${submitted.hpimage[0]}`)}>View</span>
                  <span onClick={() => handleView(`data:image/jpeg;base64,${submitted.hsimages[0]}`)}>View Answer</span>
                </div>
              </div>
            </div>
            <div className="Scontener3">
              <h1 className="Sassign">Assignment: {submitted.homeworkpending_id}</h1>
              <div className="SData">
                <div className="Sbord">
                  <ul>
                    <li>Homework Date: {submitted.date_of_given_submitted}</li>
                    <li>Submission Date: {submitted.date_of_to_submit}</li>
                    <li>Created By: {submitted.studentName}</li>
                  </ul>
                </div>
              </div>
              <div className="Scontener4">
                <h1 className="Sdescription">Description</h1>
                <span>{submitted.pending_description}</span>
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
        ariaHideApp={false}
      >
        <div className='ViewImg'>
          <button className="ViewImgButton" onClick={() => setModalIsOpen(false)}>Close</button>
          {selectedImage && <img className="viewimg" src={selectedImage} alt="Assignment" style={{ width: '100%' }} />}
        </div>
      </Modal>
    </div>
  );
};

export default Submitted;
