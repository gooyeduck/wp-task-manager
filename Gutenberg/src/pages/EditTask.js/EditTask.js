import React, { useState } from 'react';
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

function createData(id, task, description, dueDate, status, priority) {
  return { id, task, description, dueDate, status, priority };
}

export default function AddTask() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('in progress');
  const [priority, setPriority] = useState('low');

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form data to table
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', py: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Add Task</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Task"
              variant="standard"
              value={task}
              onChange={handleTaskChange}
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
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              type="date"
              label="Due Date"
              variant="standard"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" sx={{ marginTop: 1 }}>
              <FormLabel>Status</FormLabel>
              <RadioGroup row aria-label="status" name="status" value={status} onChange={handleStatusChange}>
                <FormControlLabel value="in progress" control={<Radio />} label="In Progress" />
                <FormControlLabel value="completed" control={<Radio />} label="Completed" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl required variant="standard" fullWidth sx={{ marginTop: 1 }}>
              <FormLabel>Priority</FormLabel>
              <Select value={priority} onChange={handlePriorityChange} label="Priority">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
