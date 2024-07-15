
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import './TChat.css';
import {Link} from 'react-router-dom';

const TChat = () => {
return(
    <div className='TChatcontener'>
      <div className='Theader'>
        <Link to="/chat"><FontAwesomeIcon icon={faArrowLeft} className='Ticon' /></Link>
        <img  />
        <h1>Sanjivani Dengale</h1>
      </div>
      <div className='chatconten'>
       <h1>Register As Alumni ki student karaych ahe ?</h1>
       <h2>1.00 am</h2>
      </div>
    </div>
  );
}

export default TChat;
