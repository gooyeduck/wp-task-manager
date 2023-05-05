import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TableContext from '../../Context/TableContext';
import { useContext } from 'react';


//Edit Button modal with the EditTask componet
function EditButton({ task_id }) {
  const { fullstate, dispatch } = useContext(TableContext);
  const { modalState } = fullstate;

  return (
    <div>
      <IconButton
        aria-label="edit"
        onClick={() => {
          dispatch({
            actionType: 'setModalState',
            modalState: true,
            buttonType: 'Update',
          });
          dispatch({
            actionType: 'updateTaskState',
            taskIdUpdate: task_id,
          });
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
}

export default EditButton;

EditButton.propTypes = {
  task_id: PropTypes.number,
};
