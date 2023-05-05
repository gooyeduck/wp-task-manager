import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../../Context/TableContext';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';
import { getFormattedDate } from '../../../library/stringUtils';

export default function TaskForm() {
  const { fullstate, dispatch } = useContext(TableContext);
  const { taskState, buttonType, success } = fullstate;
  const { id, task, description, dueDate, priority, status } = taskState;
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        dispatch({ actionType: 'setSuccess', success: false });
      }, 4000);
    }
  }, [success]);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Paper sx={{ padding: 4 }}>
        {showSuccess && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            Operation successful
          </Alert>
        )}
        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <Typography variant="h6">Task Name</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Task"
              variant="standard"
              value={task}
              onChange={(event) =>
                dispatch({
                  actionType: 'setTaskName',
                  task: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={3}
              label="Description"
              variant="standard"
              value={description}
              onChange={(event) =>
                dispatch({
                  actionType: 'setDescription',
                  description: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
          <FormLabel sx={{ marginTop: 1 }}>Due Date</FormLabel>
            <TextField
              required
              fullWidth
              type="date"
              label=""
              variant="standard"
              value={getFormattedDate(dueDate)}
              onChange={(event) =>
                dispatch({
                  actionType: 'setDueDate',
                  dueDate: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ marginTop: 1 }}>
              <FormLabel>Status</FormLabel>
              <RadioGroup
                row
                aria-label="status"
                name="status"
                value={status}
                onChange={(event) =>
                  dispatch({
                    actionType: 'setStatus',
                    status: event.target.value,
                  })
                }
              >
                <FormControlLabel
                  value="in progress"
                  control={<Radio />}
                  label="In Progress"
                />
                <FormControlLabel
                  value="completed"
                  control={<Radio />}
                  label="Completed"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ marginTop: 1 }}>
              <FormLabel>Priority</FormLabel>
              <RadioGroup
                row
                aria-label="priority"
                name="priority"
                value={priority}
                onChange={(event) =>
                  dispatch({
                    actionType: 'setPriority',
                    priority: event.target.value,
                  })
                }
              >
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="high"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {/* Type Check for setting the state for Addind or Updating the data inside the form */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {buttonType == 'Add' ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch({ actionType: 'submitData' });
                    dispatch({ actionType: 'setSuccess', success: true });
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
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch({ actionType: 'updateData', taskId: { id } });
                    dispatch({ actionType: 'setSuccess', success: true });
                  }}
                >
                  Update
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
