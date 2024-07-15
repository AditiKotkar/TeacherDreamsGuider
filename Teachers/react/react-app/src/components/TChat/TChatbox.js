import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBellSlash, faBell } from '@fortawesome/free-solid-svg-icons';
import './TChatbox.css';
import { Link } from 'react-router-dom';

function TChatbox() {
  const [activeChat, setActiveChat] = useState('chat1');

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <div className='TChatcontener'>
      <div className='Theader'>
      <Link to="/teacher"><FontAwesomeIcon icon={faArrowLeft} className='Ticon' /></Link>
      </div>
      <div className="Teacherchat">
        <div 
          className={`TSpan ${activeChat === 'chat1' ? 'active' : ''}`} 
          onClick={() => handleChatClick('chat1')}
        >
          <span><FontAwesomeIcon icon={faBell} className='TChaticon'/>Chat</span>
        </div>
        <div 
          className={`TSpan ${activeChat === 'chat2' ? 'active' : ''}`} 
          onClick={() => handleChatClick('chat2')}
        >
          <span><FontAwesomeIcon icon={faBellSlash} className='TChaticon'/>Chat</span>
        </div>
      </div>
      <div className='Chatconteners'>
        <Link to="/TChat">
          <div className='Chatnamebox'>
            <img className='Chatboximg' alt='Profile' />
            <div className='Chatnametext'>
              <h1 className='Chatnikita'>Sanjivani Dengale</h1>
            </div>
            <div className='Chattime'>
              <h1>12:34 am</h1>
              <div className='msg'>2</div>
            </div>
          </div>
        </Link>
        <div className='Chatnamebox'>
          <img className='Chatboximg' alt='Profile' />
          <div className='Chatnametext'>
            <h1 className='Chatnikita'>Priyanka Chature</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TChatbox;