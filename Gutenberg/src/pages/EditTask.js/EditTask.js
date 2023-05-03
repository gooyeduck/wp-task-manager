import React from 'react';
import TableContext from '../../Context/TableContext';
import { useContext } from 'react';
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
  Select,
  MenuItem,
} from '@mui/material';
import { getFormattedDate } from '../../../library/stringUtils';

export default function EditTask({updateId}) {
  const { fullstate, dispatch } = useContext(TableContext);
  const { taskState } = fullstate;
  const { id,task, description, dueDate, priority, status } = taskState;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Paper sx={{ padding: 4 }}>
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
            <TextField
              required
              fullWidth
              type="date"
              label="Due Date"
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
          <Grid item xs={3}>
            <FormControl
              required
              variant="standard"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              <FormLabel>Priority</FormLabel>
              <Select
                value={priority}
                onChange={(event) =>
                  dispatch({
                    actionType: 'setPriority',
                    priority: event.target.value,
                  })
                }
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch({actionType:"updateData",taskId:{id}}) }
              >
                
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
