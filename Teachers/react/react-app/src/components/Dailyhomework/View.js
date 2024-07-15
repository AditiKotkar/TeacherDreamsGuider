import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Submitted.css';

Modal.setAppElement('#root');

const useFetchHomework = () => {
  const [homeworkData, setHomeworkData] = useState([]);
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
      
        console.log("Fetching data with parameters: ", {
          collegeCode,
          teacherCode,
          Standard,
          Division,
          subject_id
        });

        const response = await fetch(`https://apiaws.onrender.com/viewhomework?college_code=${collegeCode}&teacher_code=${teacherCode}&Standard=${Standard}&Division=${Division}&subject_id=${subject_id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No pending assignments found.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        console.log("API response data: ", data);

        if (Array.isArray(data)) {
          setHomeworkData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { homeworkData, error, loading };
};

const Submitted = () => {
  const { homeworkData, error, loading } = useFetchHomework();
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
      {homeworkData.length > 0 ? (
        homeworkData.map((homework, index) => (
          <div className="Scontener2" key={index}>
            <div className="Sbuten">
              <div className="but2">
                <h1 className="Senglish">{homework.subject_name}</h1>
                <div className="Sbuttons2">
                  <span onClick={() => handleView(`data:image/jpeg;base64,${homework.image}`)}>View</span>
                </div>
              </div>
            </div>
            <div className="Scontener3">
              <h1 className="Sassign">Assignment: {homework.hid}</h1>
              <div className="SData">
                <div className="Sbord">
                  <ul>
                    <li>Homework Date: {homework.date_of_given}</li>
                    <li>Created On: {homework.date_of_creation}</li>
                  </ul>
                </div>
              </div>
              <div className="Scontener4">
                <h1 className="Sdescription">Description</h1>
                <span>{homework.description}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No homework assignments found.</div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="View Homework Image"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div className='ViewImg'>
          <button className="ViewImgButton" onClick={() => setModalIsOpen(false)}>Close</button>
          {selectedImage && <img className="viewimg" src={selectedImage} alt="Homework" style={{ width: '100%' }} />}
        </div>
      </Modal>
    </div>
  );
};

export default Submitted;
