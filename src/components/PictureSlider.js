// src/components/PictureSlider.js
import React from 'react';
import './styles/PictureSlider.css';

const PictureSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="picture-slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${currentIndex === index ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
    </div>
  );
};

export default PictureSlider;
