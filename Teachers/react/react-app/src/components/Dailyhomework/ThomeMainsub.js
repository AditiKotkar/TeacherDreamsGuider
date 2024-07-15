/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import './Thomemainsub.css';
import Created  from './Created';
import Pending  from './Pending';
import View from './View';
import Submitted from './Submitted';

function ThomeMainsub () {
  const [activeTab, setActiveTab] = useState('Created');
  
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  }
  const [selectedBox, setSelectedBox] = useState('Created');
  const handleBoxClick = (boxName) => {
    setSelectedBox(boxName);
  };
  return (
    <div className="Thomemaincontener">
    <div className="Thomemaincontener1">
        <div className="Thomemaintextimg">
            <h1 className="Thomemaintext">Your Homework<br></br>is here!</h1>
            <div className="Thomemainimg"></div>
        </div>
    </div>
    <div className="Thomemainbut1">
        <div className="Thomemainbuttons1">
            <div className= {`Thomediv ${selectedBox === 'Created' ? 'selected Created' : ''}`} onClick={() => {handleTabChange('Created'); handleBoxClick('Created');}}>
            <span className={`Thometab-button ${activeTab === 'Created' ? 'active' : ''}`}>Created</span>
            </div>
            <div className= {`Thomediv ${selectedBox === 'Pending' ? 'selected Pending' : ''}`} onClick={() => {handleTabChange('Pending'); handleBoxClick('Pending');}}>
            <span className={`Thometab-button ${activeTab === 'Pending' ? 'active' : ''}`}>Pending</span>
            </div>
            <div className= {`Thomediv ${selectedBox === 'View' ? 'selected View' : ''}`} onClick={() => {handleTabChange('View'); handleBoxClick('View');}}>
            <span className={`Thometab-button ${activeTab === 'View' ? 'active' : ''}`}>View</span>
            </div>
            <div className= {`Thomediv ${selectedBox === 'Submitted' ? 'selected Submitted' : ''}`} onClick={() => {handleTabChange('Submitted'); handleBoxClick('Submitted');}}>
            <span className={`Thometab-button ${activeTab === 'Submitted' ? 'active' : ''}`}>Submitted</span>
            </div>
        </div>
    </div>
    {activeTab === 'Created' && <Created />}
    {activeTab === 'Pending' && <Pending />}
    {activeTab === 'View' && <View />}
    {activeTab === 'Submitted' && <Submitted />}
    </div>    
  );
}

export default ThomeMainsub;
