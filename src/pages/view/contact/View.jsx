import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Divider,
  Toolbar,
  Button,
} from '@mui/material';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../container/contact/slice';
import FormatDate from '../../../utils/defult/FormatDate';

const View = ({ open, onClose, data }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (data?._id) {
      await dispatch(deleteContact(data._id));
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          backgroundColor: '#fff',
          minHeight: '400px',
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 500,
              color: '#202124',
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {data?.name || 'Contact Message'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseOutlined style={{ fontSize: '20px', color: '#202124' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <Toolbar
        sx={{
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
          px: 2,
          py: 1,
          minHeight: '48px !important',
        }}
      >
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlined />}
          onClick={handleDelete}
          sx={{
            textTransform: 'none',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.875rem',
            borderRadius: '4px',
            borderColor: '#dadce0',
            color: '#d93025',
            '&:hover': {
              borderColor: '#d93025',
              backgroundColor: '#fef7e0',
            },
          }}
        >
          Delete
        </Button>
      </Toolbar>
      <DialogContent sx={{ p: 3, backgroundColor: '#fff' }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#5f6368',
              fontFamily: "'Roboto', sans-serif",
              fontSize: '0.875rem',
            }}
          >
            <strong>From:</strong>{' '}
            <Typography
              component="a"
              href={`mailto:${data?.email}`}
              sx={{
                color: '#1a73e8',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {data?.fullname || data?.name || 'N/A'}
            </Typography>{' '}
            &lt;
            <Typography
              component="a"
              href={`mailto:${data?.email}`}
              sx={{
                color: '#1a73e8',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {data?.email || 'N/A'}
            </Typography>
            &gt;
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#5f6368',
              fontFamily: "'Roboto', sans-serif",
              fontSize: '0.875rem',
            }}
          >
            <strong>Mobile:</strong>{' '}
            <Typography
              component="a"
              href={`tel:${data?.mobile}`}
              sx={{
                color: '#1a73e8',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {data?.mobile || 'N/A'}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#5f6368',
              fontFamily: "'Roboto', sans-serif",
              fontSize: '0.875rem',
            }}
          >
            <strong>Location:</strong> {data?.location || 'N/A'}
          </Typography>
        </Box>
        <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />

        <Typography
          variant="body2"
          sx={{
            color: '#5f6368',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.875rem',
          }}
        >
          <strong>Course:</strong>{' '}
          <Typography
            component="a"
            href={`tel:${data?.course}`}
            sx={{
              color: '#1a73e8',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {data?.course || 'N/A'}
          </Typography>
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#5f6368',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '0.875rem',
          }}
        >
          <strong>College:</strong>{' '}
          <Typography
            component="a"
            href={`tel:${data?.school}`}
            sx={{
              color: '#1a73e8',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {data?.school || 'N/A'}
          </Typography>
        </Typography>

        
      </DialogContent>
    </Dialog>
  );
};

export default View;