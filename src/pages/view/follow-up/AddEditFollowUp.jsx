// AddEditFollowUp.jsx
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createFollowUp, updateFollowUp } from '../../container/follow-up/slice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddEditFollowUp = ({ open, enquiry, followUp, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.followUp);

  const [form, setForm] = useState({
    followUpDetails: '',
    nextContactDate: '',
    remarks: '',
  });

  useEffect(() => {
    if (followUp?._id) {
      // Editing an existing follow-up
      setForm({
        followUpDetails: followUp.followUpDetails || '',
        nextContactDate: followUp.nextContactDate
          ? new Date(followUp.nextContactDate).toISOString().slice(0, 10)
          : '',
        remarks: followUp.remarks || '',
      });
    } else {
      // Creating a new follow-up
      setForm({
        followUpDetails: '',
        nextContactDate: '',
        remarks: '',
      });
    }
  }, [followUp]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.followUpDetails || !form.nextContactDate) {
      toast.error('Please fill required fields.');
      return;
    }

    // Determine enqId: use followUp.enqId for editing, enquiry._id for creating
    const enqId = followUp?._id ? followUp.enqId : enquiry?._id;

    if (!enqId) {
      toast.error('No valid enquiry ID provided.');
      return;
    }

    const payload = {
      ...form,
      enqId,
    };

    if (followUp?._id) {
      dispatch(updateFollowUp({ id: followUp._id, data: payload }));
    } else {
      dispatch(createFollowUp(payload));
    }

    handleClose();
  };

  const handleClose = () => {
    setForm({
      followUpDetails: '',
      nextContactDate: '',
      remarks: '',
    });
    onClose();
  };

  if (!open) return null;

  // Error case: editing a follow-up with no enqId
  if (followUp?._id && !followUp?.enqId) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Error
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography color="error">
            Invalid follow-up data: No enquiry information provided.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {followUp?._id ? 'Edit Follow-Up' : 'Add Follow-Up'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          {(enquiry || followUp?.enqId) && (
            <Typography variant="subtitle2" color="textSecondary">
              Enquiry: {(enquiry?.fName || followUp?.enqId?.fName || 'N/A')} (
              {enquiry?.enqNo || followUp?.enqId?.enqNo || 'N/A'})
            </Typography>
          )}

          <TextField
            label="Follow-Up Details"
            name="followUpDetails"
            value={form.followUpDetails}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
            required
            error={!form.followUpDetails}
            helperText={!form.followUpDetails ? 'This field is required' : ''}
          />

          <TextField
            type="date"
            name="nextContactDate"
            label="Next Contact Date"
            value={form.nextContactDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            error={!form.nextContactDate}
            helperText={!form.nextContactDate ? 'This field is required' : ''}
          />

          <TextField
            label="Remarks"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : followUp?._id ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditFollowUp;