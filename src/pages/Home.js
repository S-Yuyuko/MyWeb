// src/pages/Home.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import PictureSlider from '../components/PictureSlider';
import IntroductionSection from '../components/IntroductionSection';
import Contact from '../components/Contact';
import { FaProjectDiagram, FaBriefcase } from 'react-icons/fa';
import './styles/Home.css';

const Home = () => {
  const { identity, setIdentity, content, handleContentChange, sliderImages, handleFileChange, handleImageUploadClick, handleImageDelete, selectedFile, handleSaveAndRefresh } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedIdentity = localStorage.getItem('identity');
    if (storedIdentity) {
      setIdentity(storedIdentity);
    }
  }, [setIdentity]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sliderOpacity = Math.max(1 - scrollY / windowHeight, 0);
      const introSection = document.querySelector('.introduction-section');

      document.querySelector('.picture-slider').style.opacity = sliderOpacity;

      if (scrollY > windowHeight / 2) {
        introSection.classList.add('visible');
      } else {
        introSection.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleSaveAndRefresh();
    setIsEditing(false);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="home-container">
      <PictureSlider images={sliderImages.map((image) => image.image)} />
      <IntroductionSection content={content} />
      <div className="links-section">
        <h2>If you want to know more, here is:</h2>
        <div className="links">
          <Link to="/project&professional" className="link-button">
            <FaBriefcase className="icon" size={20} /> Projects & Professional Experiences
          </Link>
          <Link to="/aboutme" className="link-button">
            <FaProjectDiagram className="icon" size={20} /> About me
          </Link>
        </div>
      </div>
      {identity === 'admin' && (
        <button onClick={handleEditClick} className="edit-button">
          Edit
        </button>
      )}
      {isEditing && (
        <div className="modal-overlay" onClick={handleCloseClick}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseClick}>&times;</span>
            <div className="editor-section">
              <div className="material-input">
                <label>Title</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  placeholder="Title"
                />

              </div>
              <div className="material-input">
                <label>Description</label>
                <textarea
                  value={content.description}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                  placeholder="Description"
                />
              </div>
              <div className="material-input">
                <label>Slider</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              {selectedFile && (
                <button onClick={handleImageUploadClick} className="upload-button">
                  Upload Image
                </button>
              )}
              {sliderImages.length > 0 && (
                <div className="slider-editor">
                  {sliderImages.map((image) => (
                    <div key={image.id} className="slider-image-container">
                      <img src={image.image} alt={`Slider ${image.id}`} className="slider-image" />
                      <button onClick={() => handleImageDelete(image.id)} className="delete-button">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={handleSaveClick} className="save-button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Contact />
    </div>
  );
};

export default Home;
