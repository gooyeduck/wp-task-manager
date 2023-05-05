import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TableContext from '../../Context/TableContext';
import { useContext } from 'react';
import TaskForm from '../TaskForm/TaskForm';

const ModalBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: '9999',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ModalContainer = styled('div')(({ theme }) => ({
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

const ModalTitle = styled('div')(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 'bold',
  marginBottom: '20px',
}));

const ModalCloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#666',
}));

export default function TaskModal() {
  const { fullstate, dispatch } = useContext(TableContext);
  const { modalState, buttonType} = fullstate;

  return (
    <div>
      {modalState && (
        <ModalBackground>
          <ModalContainer>
            <ModalTitle>{buttonType === 'Add' ? 'Add Task' : 'Update Task'}</ModalTitle>
            <ModalCloseButton
              aria-label="close"
              onClick={() =>
                dispatch({ actionType: 'setModalState', modalState: false })
              }
            >
              <CloseIcon />
            </ModalCloseButton>
            <TaskForm />
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
}
