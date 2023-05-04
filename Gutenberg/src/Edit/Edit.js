import { useBlockProps } from '@wordpress/block-editor';
import Tables from '../components/Tables/Tables';
import TableContext from '../Context/TableContext';
import TaskList from '../Api/TaskList';
import Create from '../Api/Create';
import Delete from '../Api/Delete';
import { useEffect, useState } from 'react';
import { useReducer } from 'react';
import AddButton from '../components/AddButton/AddButton';
import updateTask from '../Api/Update';

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
      priority: '',
    },
    success: false,
    modalState: false,
    buttonType:'',
    elements: [],
    lastFetched: Date.now(),
  };

  const [fullstate, dispatch] = useReducer(reducer, initialState);
  const { lastFetched } = fullstate;

  function reducer(state, action) {
    const {
      taskId,
      taskResetState,
      taskIdUpdate,
      actionType,
      elements,
      modalState,
      task,
      description,
      dueDate,
      status,
      priority,
      buttonType,
      success
    } = action;

    if (actionType === 'setElements') {
      return { ...state, elements };
    }
    if (actionType === 'setSuccess') {
      return { ...state, success };
    }

    if (actionType === 'setModalState') {
      return { ...state, modalState, buttonType };
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

    if (actionType === 'resetTaskState') {
      let taskState = taskResetState;
      return { ...state, taskState };
    }

    if (actionType === 'setPriority') {
      var { taskState } = state;
      var taskState = { ...taskState, priority };
      return { ...state, taskState };
    }

    if (actionType === 'submitData') {
      let { taskState } = state;
      Create(taskState).then((res) => {
        if (res) {
          return state;
        } else {
          return state;
        }
      });
      return { ...state, lastFetched: Date.now() };
    }

    if (actionType === 'updateData') {
      let { id } = taskId;
      let { taskState } = state;

      updateTask(id, taskState).
      then((res) => {
        if( res === 'Task is updated' ){
          return state;
        } else {
          return state;
        }
      });

      return { ...state, lastFetched: Date.now() };
    }

    if (actionType === 'deleteData') {
      let { id } = taskId;
      Delete(id).then((res) => {
        if (res) {
          return state;
        } else {
          return state;
        }
      });

      return { ...state, lastFetched: Date.now() };
    }

    if (actionType === 'updateTaskState') {
      let { elements } = state;
      let { id,title, description, priority, due_date, completion_status } =
        elements.find((element) => element.id == taskIdUpdate);
      let taskState = {
        id: id,
        task: title,
        description: description,
        dueDate: due_date,
        status: completion_status,
        priority: priority,
      };
      return { ...state, taskState };
    }

    return state;
  }

  useEffect(() => {
    setTimeout(() => {
      TaskList().then((result) => {
        dispatch({ actionType: 'setElements', elements: result });
      });
    }, 50);
  }, [lastFetched]);

  const handleDelete = (id) => {
    dispatch({ actionType: 'deleteData', taskId: { id } });
  };

  const { taskState } = fullstate;
  console.log(fullstate);
  return (
    <div {...blockProps}>
      <TableContext.Provider value={{ fullstate, dispatch, handleDelete }}>
        <AddButton />
        <Tables />
      </TableContext.Provider>
    </div>
  );
};

export default Edit;
