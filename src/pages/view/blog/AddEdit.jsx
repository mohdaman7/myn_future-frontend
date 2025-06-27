// AddEdit.jsx
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
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  shortDesc: Yup.string().required('Short Description is required'),
  fullDesc: Yup.string().required('Full Description is required'),
  link: Yup.string()
    .nullable()
    .matches(
      /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.]*)*\/?$/,
      { message: 'Enter a valid URL', excludeEmptyString: true }
    ),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed (jpeg, jpg, png, gif)', (value) => {
      if (!value) return false;
      if (typeof value === 'string') return true;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
    }),
  createdBy: Yup.string().default('admin'),
  updatedBy: Yup.string().default('admin'),
  updatedAt: Yup.date().nullable(),
  isVisible: Yup.boolean().default(true),
});

const AddEdit = ({ open, onClose, onSubmit, editData }) => {
  const isEdit = Boolean(editData && editData._id);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editData?.image) {
      setPreviewImage(editData.image); // Set preview for existing image
    } else {
      setPreviewImage(null);
    }
  }, [editData]);

  const initialValues = {
    title: editData?.title || '',
    shortDesc: editData?.shortDesc || '',
    fullDesc: editData?.fullDesc || '',
    link: editData?.link || '',
    createdBy: editData?.createdBy || 'admin',
    updatedBy: editData?.updatedBy || 'admin',
    updatedAt: editData?.updatedAt ? new Date(editData.updatedAt) : null,
    isVisible: editData?.isVisible !== undefined ? editData.isVisible : true,
    image: editData?.image || null, // Initialize with existing image URL or null
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const formattedValues = {
      ...values,
      updatedAt: isEdit ? new Date().toISOString() : values.updatedAt, // Set update time for edits
      image: values.image || editData?.image, // Use new image or existing one
    };
    console.log('Form submission values:', formattedValues);
    if (!formattedValues.image) {
      setSubmitting(false);
      return; // Prevent submission if image is null
    }
    onSubmit(formattedValues);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>

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

                {/* Visibility Checkbox */}
                {/* <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <FormControlLabel
                      control={
                        <Field name="isVisible">
                          {({ field }) => (
                            <Checkbox
                              {...field}
                              checked={values.isVisible}
                              onChange={(e) => setFieldValue('isVisible', e.target.checked)}
                              color="primary"
                            />
                          )}
                        </Field>
                      }
                      label={
                        <Typography variant="body1">
                          Make blog visible to public
                        </Typography>
                      }
                    />
                  </Box>
                  <Typography variant="caption" color="textSecondary" sx={{ ml: 4, display: 'block' }}>
                    {values.isVisible ? 'Blog will be published and visible to users' : 'Blog will be saved as draft'}
                  </Typography>
                </Grid> */}

                {/* Image Upload */}
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Blog Image *
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
                          setPreviewImage(editData?.image || null); // Revert to existing image
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
                        alt="Blog Preview"
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

                {/* Updated At (Display only for edit) */}
                {/* {isEdit && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Updated"
                      value={values.updatedAt ? formatDateTime(values.updatedAt) : 'N/A'}
                      fullWidth
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                )} */}
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