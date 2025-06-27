import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { pageStyles } from '../../assets/style/commen';
import Warning from '@mui/icons-material/Warning';

const DeleteModel = ({ open, onClose, data, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '400px',
          minWidth: '300px',
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
        },
      }}
    >
      <DialogTitle id="delete-dialog-title" sx={{ fontWeight: 600, fontSize: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Warning sx={{ color: '#d32f2f', fontSize: '4rem', mb: 1 }} />
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete{' '}
          <strong>{data?.name || data?.college?.name || 'This Item'}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            ...pageStyles.cancelButton,
            color: '#666',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteConfirm}
          variant="contained"
          color="error"
          sx={{
            ...pageStyles.deleteButton,
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModel;