import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

const IncrementButton = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggle = () => {
    setIsCompleted(prevState => !prevState);
  };

  return (
    <div>
      <Switch checked={isCompleted} onChange={handleToggle} />
      <span style={{ color: isCompleted ? 'green' : 'red' }}>
        {isCompleted ? 'Completed' : 'In Progress'}
      </span>
    </div>
  );
};

export default IncrementButton;
