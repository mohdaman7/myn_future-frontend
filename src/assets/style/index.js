
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: '1px solid #f0f0f0',
  borderRadius: '10px',
  fontFamily: 'Roboto, sans-serif',

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f2f6f9',
    fontWeight: 'bold',
    fontSize:"14px",
    borderRadius: '10px 10px 0px 0px',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid #f0f0f0',
    fontSize: '13px', 
    fontWeight: 'normal',
    color:"#343434"
  },

 '& .MuiDataGrid-virtualScroller': {
    '&::-webkit-scrollbar': {
      width: '4px', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888', 
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555', 
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1', 
      borderRadius: '10px',
    },
  },

}));