import React from 'react';

const Card = ({ title, description }) => {

  return (
    <div style={{
      background: 'var(--cardBackground)',
      border: `1px solid var(--cardBorder)`,
      padding: '20px',
      margin: '10px 0'
    }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
