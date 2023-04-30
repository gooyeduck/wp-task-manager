import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Tables from '../Gutenberg/src/components/Tables/Tables';
import Dialouge from '../Gutenberg/src/components/Dialouge/Dialouge';

const Front = () => {
  return (
    <div>
      <Dialouge />
      <Tables />
    </div>
  );
};

const root = createRoot(document.getElementById('task-manager-parent'));
root.render(<Front />);
