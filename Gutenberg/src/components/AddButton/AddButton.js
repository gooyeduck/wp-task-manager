import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddTask from '../../pages/AddTask/AddTask';
import TableContext from '../../Context/TableContext';
import { useContext } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddButton() {
  const { fullstate, dispatch } = useContext(TableContext);
  const { modalState } = fullstate;

  return (
    <div>
      <Button onClick={() => dispatch({actionType:'setModalState', modalState:true})}>Add Task</Button>
      <BootstrapDialog
        onClose={() => dispatch({actionType:'setModalState', modalState:false})}
        aria-labelledby="customized-dialog-title"
        open={modalState}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => dispatch({actionType:'setModalState', modalState:false})}
        >
          Add Task
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <AddTask />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
