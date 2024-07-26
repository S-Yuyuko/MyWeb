// src/components/IntroductionSection.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './styles/IntroductionSection.css';

const IntroductionSection = () => {
  const { identity, content, isEditing, handleContentChange, selectedFile, handleFileChange, handleImageUploadClick, sliderImages, handleImageDelete, handleSaveAndRefresh, setIsEditing } = useContext(AppContext);

  return (
    <div className="introduction-section">
      {isEditing && identity === 'admin' ? (
        <div className="editor">
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleContentChange('title', e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={content.description}
            onChange={(e) => handleContentChange('description', e.target.value)}
            placeholder="Description"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
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
          <button onClick={handleSaveAndRefresh} className="save-button">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <div className="introduction-text">
          <h2>{content.title}</h2>
          {content.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default IntroductionSection;
