import { useBlockProps } from '@wordpress/block-editor';
import Tables from '../components/Tables/Tables';
import Dialouge from '../components/Dialouge/Dialouge';
import TableContext from '../Context/TableContext';
import TaskList from '../Api/TaskList';
import Create from '../Api/Create';
import { useEffect, useState } from 'react';
import { dateFormat } from '../../library/stringUtils';

const Edit = ({ isSelected }) => {
  const blockProps = useBlockProps({
    id: 'task-manager-parent',
    style: {
      margin: '0 !important;',
      padding: '0 !important;',
    },
  });
  
  const [task, setTask]               = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate]         = useState('');
  const [status, setStatus]           = useState('');
  const [priority, setPriority]       = useState('');
  const [open, setOpen]               = useState(false);
  const [elements, setElements]               = useState([]);
  const [lastFetched, setLastFetched] = useState(Date.now());

  useEffect(() => {
      TaskList().
      then((result) => {
          setElements(result);
      });
  }, [lastFetched]);

  //Click Handlers
  function handleTaskChange(event) {
    setTask(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleDueDateChange(event) {
    setDueDate(event.target.value);
    console.log(event.target.value);
  }

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  function handlePriorityChange(event) {
    setPriority(event.target.value);
  }

  function handleSubmit() {
    let dataObject = {
      task_name:task,
      task_desc:description,
      task_priority:priority,
      task_due_date:dueDate,
      task_status:status
    }
    Create(dataObject).
    then((res) => {
      if(res) {
        setLastFetched(Date.now());
      }
    });
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div {...blockProps}>
      <TableContext.Provider value={{elements, open, task, description, status, dueDate, priority, handleTaskChange, handleDescriptionChange, handleDueDateChange, handleStatusChange, handlePriorityChange, handleClickOpen, handleClose, handleSubmit}}>
        <Dialouge/>
        <Tables />
      </TableContext.Provider>
    </div>
  );
};

export default Edit;
