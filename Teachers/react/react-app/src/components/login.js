import React, { useState } from 'react';
import './studentlogin.css';
import logo from './images/background 3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import google from './images/google 1.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function StudentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      if (response.ok) {
        navigate('/student');
      } else {
        alert(data); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [selectedBox, setSelectedBox] = useState(null);
  const handleBoxClick = (boxName) => {
    setSelectedBox(boxName);
  };
  return (
    <div className='contener-9'>
      <div className='form-9'>
        <input className='user-9' type="text" placeholder="Username (Mobile/Email)" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className='line-9'></div>
        <input className='user-9' type="password" placeholder="Password/OTP" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className='line-9'></div>
        {/* <h1 className='school-9'>Forget Password?</h1> */}
      </div> 
    </div>
  );
}

export default StudentLogin;