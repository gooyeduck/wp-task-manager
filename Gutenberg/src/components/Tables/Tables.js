import * as React from 'react';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContext from '../../Context/TableContext';
import { useContext } from 'react';
import { titleCase, getFormattedDate } from '../../../library/stringUtils';
import EditButton from '../EditButton/EditButton';

//Table Component for Viewing the data in tabular form

export default function Tables() {
  const { fullstate, handleDelete } = useContext(TableContext);
  const { elements } = fullstate;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: '#333', fontWeight: 'bold' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Task</TableCell>
            <TableCell sx={{ color: 'white' }}>Task Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Priority</TableCell>
            <TableCell sx={{ color: 'white' }}>Due Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elements.length > 0 ? (
            elements.map((element) => (
              <TableRow
                key={element.id}
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
                  {element.title}
                </TableCell>

                <TableCell
                  align="left"
                  sx={{
                    wordWrap: 'break-word',
                    maxWidth: 150,
                  }}
                >
                  {element.description}
                </TableCell>
                <TableCell align="left">
                  <span
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor:
                        element.priority === 'low'
                          ? '#4caf50'
                          : element.priority === 'medium'
                          ? '#fdae20'
                          : '#ef3d59',
                      borderRadius: 20,
                      padding: '5px 15px',
                    }}
                  >
                    {titleCase(element.priority)}
                  </span>
                </TableCell>
                <TableCell align="left">
                  {getFormattedDate(element.due_date)}
                </TableCell>

                <TableCell align="left">
                  <span
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      backgroundColor:
                        element.completion_status === 'completed'
                          ? '#4caf50'
                          : '#5e0087',
                      borderRadius: 20,
                      padding: '5px 15px',
                    }}
                  >
                    {titleCase(element.completion_status)}
                  </span>
                </TableCell>

                <TableCell align="left">
                    <EditButton task_id={element.id}/>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(element.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <p>Task Unavilable</p>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
