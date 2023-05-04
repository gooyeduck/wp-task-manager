import * as React from 'react';
import Button from '@mui/material/Button';
import TableContext from '../../Context/TableContext';
import { useContext } from 'react';

export default function AddButton() {
  const { fullstate, dispatch } = useContext(TableContext);
  const { modalState } = fullstate;

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          dispatch({
            actionType: 'setModalState',
            modalState: true,
            buttonType: 'Add',
          });
          dispatch({
            actionType: 'resetTaskState',
            taskResetState: {
              task: '',
              description: '',
              dueDate: '',
              status: '',
              priority: '',
            },
          });
        }}
      >
        Add Task
      </Button>
    </div>
  );
}
