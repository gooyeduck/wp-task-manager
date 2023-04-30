import './index.css';
import Edit from './Edit/Edit';
import Attributes from './Attributes/Attributes';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType('src/task-manager', {
  title: 'Task Manager',
  description: 'Task Manager Block',
  category: 'widgets',
  keywords: ['task mananger'],
  Attributes,
  edit: Edit,
  save: () => null,
  example: {
    viewportWidth: 1200,
  },
});
