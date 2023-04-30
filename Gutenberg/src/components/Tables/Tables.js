import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(id, task, description, dueDate, status, priority) {
  return { id, task, description, dueDate, status, priority };
}

const rows = [
  createData(
    1,
    'Task 1 of the rumen vala',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquam augue eget turpis vehicula fringilla. ',
    '2022-01-01',
    'Completed',
    'Low'
  ),
  createData(
    2,
    'Task 2',
    'Sed iaculis justo a tellus condimentum imperdiet. Proin bibendum eros vitae elit pellentesque, in dictum turpis pharetra. Sed malesuada quis sapien a venenatis. ',
    '2022-01-02',
    'In Progress',
    'Medium'
  ),
  createData(
    3,
    'Task 3',
    'Fusce eu semper augue. Nullam malesuada felis ac enim dictum, vel laoreet arcu varius. Aliquam id sagittis turpis, id ultricies nisl. ',
    '2022-01-03',
    'In Progress',
    'High'
  ),
];

export default function Tables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: '#333', fontWeight: 'bold' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Task</TableCell>
            <TableCell sx={{ color: 'white' }}>Task Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>Priority</TableCell>
            <TableCell sx={{ color: 'white' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.task}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  wordWrap: 'break-word',
                  maxWidth: 120,
                }}
              >
                {row.task}
              </TableCell>

              <TableCell
                align="left"
                sx={{
                  wordWrap: 'break-word',
                  maxWidth: 150,
                }}
              >
                {row.description}
              </TableCell>

              <TableCell align="left">{row.dueDate}</TableCell>

              <TableCell align="left">
                <span
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor:
                      row.status === 'Completed' ? '#4caf50' : '#5e0087',
                    borderRadius: 20,
                    padding: '5px 15px',
                  }}
                >
                  {row.status}
                </span>
              </TableCell>

              <TableCell align="left">
                <span
                  style={{
                    color:'white',
                    fontWeight: 'bold',
                    backgroundColor:
                      row.priority === 'Low'
                        ? '#4caf50'
                        : row.priority === 'Medium'
                        ? '#fdae20'
                        : '#ef3d59',
                    borderRadius: 20,
                    padding: '5px 15px',
                  }}
                >
                  {row.priority}
                </span>
              </TableCell>

              <TableCell align="left">
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
