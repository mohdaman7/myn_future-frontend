import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getColleges } from '../../container/colleges/slice';

// Validation schema
const validationSchema = Yup.object({
  college: Yup.string()
    .required('College is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid college ID'),
  intakeMonth: Yup.string().required('Intake month is required'),
  intakeYear: Yup.number()
    .required('Intake year is required')
    .min(new Date().getFullYear(), 'Intake year cannot be in the past'),
  deadlineDate: Yup.date()
    .required('Deadline date is required')
    .min(new Date().toISOString().split('T')[0], 'Deadline date cannot be in the past'),
  status: Yup.string()
    .oneOf(['open', 'closed'])
    .required('Status is required'),
});

const AddEdit = ({ open, onClose, onSubmit, editData }) => {
  const dispatch = useDispatch();
  const { colleges, loading, error } = useSelector(
    (state) => state.college || { colleges: [], loading: false, error: '' }
  );

  const isEdit = Boolean(editData && editData._id);

  useEffect(() => {
    if (open) {
      dispatch(getColleges());
    }
  }, [dispatch, open]);

  const initialValues = {
    college: isEdit && editData?.college?._id ? editData.college._id : '',
    intakeMonth: editData?.intakeMonth || '',
    intakeYear: editData?.intakeYear || '',
    deadlineDate: isEdit && editData?.deadlineDate
      ? new Date(editData.deadlineDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    status: editData?.status || 'open',
    visible: editData?.visible !== undefined ? editData.visible : true,
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Submitting form with values:', values);
    // Ensure status is consistent with deadline
    const deadline = new Date(values.deadlineDate);
    const today = new Date();
    if (deadline < today && values.status === 'open') {
      console.warn('Warning: Setting status to open for a past deadline');
    }
    onSubmit(values);
    setSubmitting(false);
    resetForm();
  };

  const handleClose = () => {
    onClose();
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  const statuses = ['open', 'closed'];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Intake' : 'Add New Intake'}</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={3}>
                {/* College */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    select
                    name="college"
                    label="College *"
                    fullWidth
                    variant="outlined"
                    error={touched.college && Boolean(errors.college)}
                    helperText={touched.college && errors.college}
                  >
                    {colleges.length > 0 ? (
                      colleges.map((college) => (
                        <MenuItem key={college._id} value={college._id}>
                          {college.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No colleges available</MenuItem>
                    )}
                  </Field>
                  {loading && (
                    <Typography variant="caption" color="textSecondary">
                      Loading colleges...
                    </Typography>
                  )}
                  {error && (
                    <Typography variant="caption" color="error">
                      Failed to load colleges: {error}
                    </Typography>
                  )}
                </Grid>

                {/* Intake Month */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    select
                    name="intakeMonth"
                    label="Intake Month *"
                    fullWidth
                    variant="outlined"
                    error={touched.intakeMonth && Boolean(errors.intakeMonth)}
                    helperText={touched.intakeMonth && errors.intakeMonth}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                {/* Intake Year */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    select
                    name="intakeYear"
                    label="Intake Year *"
                    fullWidth
                    variant="outlined"
                    error={touched.intakeYear && Boolean(errors.intakeYear)}
                    helperText={touched.intakeYear && errors.intakeYear}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                {/* Deadline Date */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    type="date"
                    name="deadlineDate"
                    label="Deadline Date *"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={touched.deadlineDate && Boolean(errors.deadlineDate)}
                    helperText={touched.deadlineDate && errors.deadlineDate}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    select
                    name="status"
                    label="Status *"
                    fullWidth
                    variant="outlined"
                    error={touched.status && Boolean(errors.status)}
                    helperText={
                      (touched.status && errors.status) ||
                      (new Date(values.deadlineDate) < new Date() && values.status === 'open'
                        ? 'Warning: Status is open but deadline has passed'
                        : '')
                    }
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                {/* Visible */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={FormControlLabel}
                    name="visible"
                    control={
                      <Checkbox
                        checked={values.visible}
                        onChange={(e) => setFieldValue('visible', e.target.checked)}
                      />
                    }
                    label="Visible to Users"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || colleges.length === 0}
                sx={{ ml: 2 }}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddEdit;