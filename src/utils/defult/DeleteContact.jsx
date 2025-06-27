import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { pageStyles } from '../../assets/style/commen';
import Warning from '@mui/icons-material/Warning';
import { toast } from 'react-toastify';

const DeleteContact = ({ open, onClose, data, onConfirm, message }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(data);
      toast.success(data ? 'Contact deleted successfully' : 'Selected contacts deleted successfully');
    } catch (error) {
      console.error('Delete Contact Error:', error);
      toast.error(error.message || 'Failed to delete contact(s)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-contact-dialog-title"
      aria-describedby="delete-contact-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: '400px',
          minWidth: '300px',
          width: '100%',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          backgroundColor: '#fff',
          fontFamily: "'Roboto', sans-serif",
        },
      }}
    >
      <DialogTitle
        id="delete-contact-dialog-title"
        sx={{
          fontWeight: 500,
          fontSize: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#202124',
          p: 2,
        }}
      >
        <Warning sx={{ color: '#d93025', fontSize: '3rem', mb: 1 }} />
        Confirm Deletion
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <DialogContentText
          id="delete-contact-dialog-description"
          sx={{
            color: '#5f6368',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          {message || (
            <>
              Are you sure you want to delete{' '}
              <strong>{data?.name || 'this contact'}</strong>? This action cannot be undone.
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          sx={{
            ...pageStyles.cancelButton,
            color: '#5f6368',
            textTransform: 'none',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.875rem',
            borderRadius: '4px',
            border: '1px solid #dadce0',
            px: 2,
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
            backgroundColor: '#d93025',
            color: '#fff',
            textTransform: 'none',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.875rem',
            borderRadius: '4px',
            px: 2,
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

export default DeleteContact;