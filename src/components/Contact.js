// src/components/Contact.js
import React, { useState } from 'react';
import { FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import './styles/Contact.css';

const Contact = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const openDialog = (content) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent('');
  };

  return (
    <div className="contact-container">
      <a href="https://github.com/S-Yuyuko" target="_blank" rel="noopener noreferrer" className="icon-link">
        <FaGithub size={30} />
      </a>
      <div className="icon-link" onClick={() => openDialog('wz1305290174@gmail.com')}>
        <FaEnvelope size={30} style={{ cursor: 'pointer' }} />
      </div>
      <div className="icon-link" onClick={() => openDialog('\n +852 56257933 \n +86 13028002863')}>
        <FaPhone size={30} style={{ cursor: 'pointer' }} />
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeDialog} className="close-button">
              <AiOutlineClose size={20} />
            </button>
            <p>{dialogContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
