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
  Typography,
} from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required'),
  shortDesc: Yup.string()
    .required('Short Description is required'),
  fullDesc: Yup.string()
    .required('Full Description is required'),
  image: Yup.mixed().when('isEdit', {
    is: false, // Add mode
    then: (schema) =>
      schema
        .required('Image is required')
        .test('fileType', 'Only image files are allowed (jpeg, jpg, png, gif)', (value) => {
          if (!value) return false;
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
        })
        .test('fileSize', 'File size must be less than 5MB', (value) => {
          if (!value) return false;
          return value.size <= 5 * 1024 * 1024; // 5MB limit
        }),
    otherwise: (schema) =>
      schema
        .nullable() // Edit mode: image is optional
        .test('fileType', 'Only image files are allowed (jpeg, jpg, png, gif)', (value) => {
          if (!value) return true; // Allow null
          return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
        })
        .test('fileSize', 'File size must be less than 5MB', (value) => {
          if (!value) return true; // Allow null
          return value.size <= 5 * 1024 * 1024; // 5MB limit
        }),
  }),
  points: Yup.array()
    .of(
      Yup.object({
        title: Yup.string(), // Optional, no maxLength
        description: Yup.string(), // Optional, no maxLength
      })
    ),
  createdBy: Yup.string().default('admin'),
  updatedBy: Yup.string().default('admin'),
});

const AddEdit = ({ open, onClose, onSubmit, editData }) => {
  const isEdit = Boolean(editData && editData._id);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editData?.image) {
      setPreviewImage(editData.image); // Show existing image
    } else {
      setPreviewImage(null);
    }
  }, [editData]);

  const initialValues = {
    title: editData?.title || '',
    shortDesc: editData?.shortDesc || '',
    fullDesc: editData?.fullDesc || '',
    createdBy: editData?.createdBy || 'admin',
    updatedBy: editData?.updatedBy || 'admin',
    image: null,
    points: editData?.points || [], // Initialize with empty array
    isEdit, // For conditional validation
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submission values:', values);
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Service' : 'Add New Service'}</DialogTitle>

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

                {/* Short Description */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="shortDesc"
                    label="Short Description *"
                    fullWidth
                    variant="outlined"
                    error={touched.shortDesc && Boolean(errors.shortDesc)}
                    helperText={touched.shortDesc && errors.shortDesc}
                  />
                </Grid>

                {/* Full Description */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="fullDesc"
                    label="Full Description *"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    error={touched.fullDesc && Boolean(errors.fullDesc)}
                    helperText={touched.fullDesc && errors.fullDesc}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Service Image {isEdit ? '' : '*'}
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
                        } else if (isEdit && editData?.image) {
                          setPreviewImage(editData.image); // Retain existing image
                        } else {
                          setPreviewImage(null);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                    {touched.image && errors.image && (
                      <Typography color="error" variant="caption">
                        {errors.image}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Points */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Points
                  </Typography>
                  <FieldArray name="points">
                    {({ push, remove }) => (
                      <Box>
                        {values.points?.map((point, index) => (
                          <Box
                            key={index}
                            sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 4 }}
                          >
                            <Field
                              as={TextField}
                              name={`points[${index}].title`}
                              label="Point Title"
                              fullWidth
                              variant="outlined"
                              sx={{ mb: 1 }}
                              error={
                                touched.points?.[index]?.title &&
                                Boolean(errors.points?.[index]?.title)
                              }
                              helperText={
                                touched.points?.[index]?.title && errors.points?.[index]?.title
                              }
                            />
                            <Field
                              as={TextField}
                              name={`points[${index}].description`}
                              label="Point Description"
                              fullWidth
                              variant="outlined"
                              multiline
                              rows={2}
                              error={
                                touched.points?.[index]?.description &&
                                Boolean(errors.points?.[index]?.description)
                              }
                              helperText={
                                touched.points?.[index]?.description &&
                                errors.points?.[index]?.description
                              }
                            />
                            <Button
                              onClick={() => remove(index)}
                              color="error"
                              variant="outlined"
                              sx={{ mt: 1 }}
                            >
                              Remove Point
                            </Button>
                          </Box>
                        ))}
                        <Button
                          onClick={() => push({ title: '', description: '' })}
                          variant="contained"
                          sx={{ mt: 1 }}
                        >
                          Add Point
                        </Button>
                      </Box>
                    )}
                  </FieldArray>
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
                        alt="Service Preview"
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 4,
                          border: '1px solid #ccc',
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