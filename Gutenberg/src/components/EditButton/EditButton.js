import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import TableContext from '../../Context/TableContext';
import {useContext} from 'react';
import EditTask from '../../pages/EditTask.js/EditTask';

const ModalBackground = styled('div')(({theme}) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  zIndex: '9999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalContainer = styled('div')(({theme}) => ({
  width: 'fit-content',
  maxWidth: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
  padding: '20px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
}));

const ModalTitle = styled('div')(({theme}) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
}));

const ModalCloseButton = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#666',
}));

function EditButton({task_id}) {
  const {fullstate, dispatch} = useContext(TableContext);
  const {modalState} = fullstate;

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
        }}>
        <EditIcon />
      </IconButton>
      {modalState && (
        <ModalBackground>
          <ModalContainer>
            <ModalTitle>Task</ModalTitle>
            <ModalCloseButton
              aria-label="close"
              onClick={() =>
                dispatch({actionType: 'setModalState', modalState: false})
              }>
              <CloseIcon />
            </ModalCloseButton>
            <EditTask />
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
}

export default EditButton;

EditButton.propTypes = {
  task_id: PropTypes.number,
};
