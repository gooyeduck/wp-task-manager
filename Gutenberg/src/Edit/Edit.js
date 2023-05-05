import { useBlockProps } from '@wordpress/block-editor';
import Tables from '../components/Tables/Tables';
import TableContext from '../Context/TableContext';
import TaskList from '../Api/TaskList';
import Create from '../Api/Create';
import Delete from '../Api/Delete';
import { useEffect } from 'react';
import { useReducer } from 'react';
import AddButton from '../components/AddButton/AddButton';
import updateTask from '../Api/Update';
import TaskModal from '../pages/TaskModal/TaskModal';

const Edit = ({ isSelected }) => {
  const blockProps = useBlockProps({
    id: 'task-manager-parent',
    style: {
      margin: '0 !important;',
      padding: '0 !important;',
    },
  });

  //Initial State of the Context
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
    buttonType: '',
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
      success,
    } = action;
    
    //action Type to set the table elements
    if (actionType === 'setElements') {
      return { ...state, elements };
    }

    //action Type to set the success notification state
    if (actionType === 'setSuccess') {
      return { ...state, success };
    }

    //action type for the modal window
    if (actionType === 'setModalState') {
      return { ...state, modalState, buttonType };
    }

    //action type for setting the task name
    if (actionType === 'setTaskName') {
      var { taskState } = state;
      var taskState = { ...taskState, task };
      return { ...state, taskState };
    }

    //action type for setting the description
    if (actionType === 'setDescription') {
      var { taskState } = state;
      var taskState = { ...taskState, description };
      return { ...state, taskState };
    }

    //action type for setting the due date
    if (actionType === 'setDueDate') {
      var { taskState } = state;
      var taskState = { ...taskState, dueDate };
      return { ...state, taskState };
    }

    //action type for setting the completion status
    if (actionType === 'setStatus') {
      var { taskState } = state;
      var taskState = { ...taskState, status };
      return { ...state, taskState };
    }

    //action type for setteing the task priority
    if (actionType === 'setPriority') {
      var { taskState } = state;
      var taskState = { ...taskState, priority };
      return { ...state, taskState };
    }

    //action type for reseting the task state to initail empty state
    if (actionType === 'resetTaskState') {
      let taskState = taskResetState;
      return { ...state, taskState };
    }

    //action type for submitting the data to the database through Create API endpoint
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

    //action type for updating the data to the database through Create API endpoint
    if (actionType === 'updateData') {
      let { id } = taskId;
      let { taskState } = state;

      updateTask(id, taskState).then((res) => {
        if (res === 'Task is updated') {
          return state;
        } else {
          return state;
        }
      });

      return { ...state, lastFetched: Date.now() };
    }

    //action type for deleting the data to the database through Create API endpoint
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

    //action type for the task state update and updating the data
    if (actionType === 'updateTaskState') {
      let { elements } = state;
      let { id, title, description, priority, due_date, completion_status } =
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

  //Click handler for the delete action
  const handleDelete = (id) => {
    dispatch({ actionType: 'deleteData', taskId: { id } });
  };

  const { modalState,taskState} = fullstate;

  console.log(modalState);
  return (
    <div {...blockProps}>
      <TableContext.Provider value={{ fullstate, dispatch, handleDelete }}>
        <AddButton />
        <TaskModal/>
        <Tables />
      </TableContext.Provider>
    </div>
  );
};

export default Edit;
