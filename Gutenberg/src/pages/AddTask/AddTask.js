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

export default function AddTask() {
  const {
    open,
    task,
    description,
    status,
    dueDate,
    priority,
    handleTaskChange,
    handleDescriptionChange,
    handleDueDateChange,
    handleStatusChange,
    handlePriorityChange,
    handleSubmit,
  } = useContext(TableContext);

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
              onChange={(event) => handleTaskChange(event)}
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
              onChange={(event) => handleDescriptionChange(event)}
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
              onChange={(event) => handleDueDateChange(event)}
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
                onChange={(event) => handleStatusChange(event)}
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
                onChange={(event) => handlePriorityChange(event)}
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
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
