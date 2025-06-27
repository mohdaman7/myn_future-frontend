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

// Validation schema
const validationSchema = Yup.object({
  countryName: Yup.string().required('Country name is required'),
  code: Yup.string().required('Country code is required'),
  isoCode: Yup.string().required('ISO code is required'),
  dialCode: Yup.string().required('Dial code is required'),
  currency: Yup.string().required('Currency is required'),
  image: Yup.mixed().nullable()
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
    countryName: editData?.name || '',
    code: editData?.code || '',
    isoCode: editData?.isoCode || '',
    dialCode: editData?.dialCode || '',
    currency: editData?.currency || '',
    image: null
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submission values:', values);
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Country' : 'Add New Country'}</DialogTitle>

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
                {/* Country Name */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="countryName"
                    label="Country Name *"
                    fullWidth
                    variant="outlined"
                    error={touched.countryName && Boolean(errors.countryName)}
                    helperText={touched.countryName && errors.countryName}
                  />
                </Grid>

                {/* Country Code */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="code"
                    label="Country Code *"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g., US, IN, UK"
                    error={touched.code && Boolean(errors.code)}
                    helperText={touched.code && errors.code}
                  />
                </Grid>

                {/* ISO Code */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="isoCode"
                    label="ISO Code *"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g., USA, IND, GBR"
                    error={touched.isoCode && Boolean(errors.isoCode)}
                    helperText={touched.isoCode && errors.isoCode}
                  />
                </Grid>

                {/* Dial Code */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="dialCode"
                    label="Dial Code *"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g., +1, +91, +44"
                    error={touched.dialCode && Boolean(errors.dialCode)}
                    helperText={touched.dialCode && errors.dialCode}
                  />
                </Grid>

                {/* Currency */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="currency"
                    label="Currency *"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g., USD, INR, GBP"
                    error={touched.currency && Boolean(errors.currency)}
                    helperText={touched.currency && errors.currency}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Country Flag
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
                        alt="Flag Preview"
                        style={{
                          width: 100,
                          height: 60,
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
