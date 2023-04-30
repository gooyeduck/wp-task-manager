import { useBlockProps } from '@wordpress/block-editor';
import IncrementButton from '../components/IncrementButton';
import Tables from '../components/Tables/Tables';
import Dialouge from '../components/Dialouge/Dialouge';

const Edit = ({ isSelected }) => {
  const blockProps = useBlockProps({
    id: 'task-manager-parent',
    style: {
      margin: '0 !important;',
      padding: '0 !important;',
    },
  });

  return (
    <div {...blockProps}>
      block loaded
      <Dialouge/>
      <Tables />
    </div>
  );
};

export default Edit;
