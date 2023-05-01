import { useBlockProps } from '@wordpress/block-editor';
import Tables from '../components/Tables/Tables';
import TableContext from '../Context/TableContext';
import TaskList from '../Api/TaskList';
import Create from '../Api/Create';
import { useEffect, useState } from 'react';
import { useReducer } from 'react';
import AddButton from '../components/AddButton/AddButton';

const Edit = ({ isSelected }) => {
  const blockProps = useBlockProps({
    id: 'task-manager-parent',
    style: {
      margin: '0 !important;',
      padding: '0 !important;',
    },
  });

  const initialState = {
    taskState: {
      task: '',
      description: '',
      dueDate: '',
      status: '',
      priority:"",
    },
    modalState: false,
    elements: [],
    lastFetched: Date.now(),
  };

  const [fullstate, dispatch] = useReducer(reducer, initialState);
  const { lastFetched } = fullstate;

  function reducer(state, action) {
    const {
      actionType,
      elements,
      modalState,
      task,
      description,
      dueDate,
      status,
      priority,
    } = action;

    if (actionType === 'setElements') {
      return { ...state, elements };
    }

    if (actionType === 'setModalState') {
      return { ...state, modalState };
    }

    if (actionType === 'setTaskName') {
      var { taskState } = state;
      var taskState = { ...taskState, task };
      return { ...state, taskState };
    }

    if (actionType === 'setDescription') {
      var { taskState } = state;
      var taskState = { ...taskState, description };
      return { ...state, taskState };
    }

    if (actionType === 'setDueDate') {
      var { taskState } = state;
      var taskState = { ...taskState, dueDate };
      return { ...state, taskState };
    }

    if (actionType === 'setStatus') {
      var { taskState } = state;
      var taskState = { ...taskState, status };
      return { ...state, taskState };
    }

    if (actionType === 'setPriority') {
      var { taskState } = state;
      var taskState = { ...taskState, priority };
      return { ...state, taskState };
    }

    if (actionType === 'submitData') {
      let { taskState } = state;
      console.log(state);
      Create(taskState).then((res) => {
        if (res) {
          return state;
        } else {
          return state;
        }
      });
      return { ...state, lastFetched: Date.now() };
    }
  }

  useEffect(() => {
    setTimeout(() => {
      TaskList().then((result) => {
        console.log(result);
        dispatch({ actionType: 'setElements', elements: result });
      });
    }, 100);
  }, [lastFetched]);

  const { taskState } = fullstate;

  // function handleSubmit() {
  //   let dataObject = {
  //     task_name:task,
  //     task_desc:description,
  //     task_priority:priority,
  //     task_due_date:dueDate,
  //     task_status:status
  //   }
  // }

  return (
    <div {...blockProps}>
      <TableContext.Provider value={{ fullstate, dispatch }}>
        <AddButton />
        <Tables />
      </TableContext.Provider>
    </div>
  );
};

export default Edit;
