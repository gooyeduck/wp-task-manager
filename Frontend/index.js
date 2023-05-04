import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Tables from '../Gutenberg/src/components/Tables/Tables';

const FrontEnd = () => {
  return (
    <div>
      
    </div>
  );
};

const root = createRoot(document.getElementById('task-manager-parent'));
root.render(<FrontEnd />);
