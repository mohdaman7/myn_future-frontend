import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation schema based on gallery schema
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  from: Yup.string().required('From is required'),
  link: Yup.string()
    .nullable()
    .matches(
      /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.]*)*\/?$/,
      { message: 'Enter a valid URL', excludeEmptyString: true }
    ),
  date: Yup.date().typeError('Invalid date format'),
  image: Yup.mixed().nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Allow null/undefined
      return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
});

const AddEdit = ({ open, onClose, onSubmit, editData }) => {
  const isEdit = Boolean(editData && editData._id);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editData?.image) {
      setPreviewImage(editData.image);
    } else {
      setPreviewImage(null);
    }
  }, [editData]);

  const initialValues = {
    title: editData?.title || '',
    from: editData?.from || '',
    link: editData?.link || '',
    date: editData?.date ? new Date(editData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    image: null
  };

  // const handleSubmit = (values, { setSubmitting }) => {
  //   console.log('Form submission values:', values);
  //   onSubmit(values);
  //   setSubmitting(false);
  // };

  const handleSubmit = (values, { setSubmitting }) => {
    const formattedValues = {
      ...values,
      date: values.date ? new Date(values.date).toISOString() : new Date().toISOString(),
    };
    console.log('Form submission values:', formattedValues);
    onSubmit(formattedValues);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Gallery Item' : 'Add New Gallery Item'}</DialogTitle>

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
                {/* Title */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="title"
                    label="Title *"
                    fullWidth
                    variant="outlined"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>

                {/* From */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="from"
                    label="From *"
                    fullWidth
                    variant="outlined"
                    error={touched.from && Boolean(errors.from)}
                    helperText={touched.from && errors.from}
                  />
                </Grid>

                {/* Link */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="link"
                    label="Link"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g., https://example.com"
                    error={touched.link && Boolean(errors.link)}
                    helperText={touched.link && errors.link}
                  />
                </Grid>

                {/* Date */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="date"
                    label="Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    error={touched.date && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Gallery Image
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue('image', file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPreviewImage(reader.result);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setPreviewImage(null);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    {touched.image && errors.image && (
                      <Typography color="error" variant="caption">
                        {errors.image}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Show Preview Image */}
                {previewImage && (
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Preview:
                      </Typography>
                      <img
                        src={previewImage}
                        alt="Gallery Preview"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 4,
                          border: '1px solid #ccc'
                        }}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
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