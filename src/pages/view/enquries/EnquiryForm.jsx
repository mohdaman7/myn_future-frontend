import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import Person from '@mui/icons-material/Person';
import School from '@mui/icons-material/School';
import LocationOn from '@mui/icons-material/LocationOn';
import Message from '@mui/icons-material/Message';
import { createEnquiry } from '../../container/enquries/slice';
import { getAllCourses } from '../../container/courses/slice';
import { getColleges } from '../../container/colleges/slice';

const EnquiryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: enquiryLoading, error: enquiryError } = useSelector((state) => state.enquiries);
  const { allCourses: courses, loading: coursesLoading, error: coursesError } = useSelector((state) => state.courses);
  const { colleges, loading: collegesLoading, error: collegesError } = useSelector((state) => state.college);

  console.log("All Courses:", courses);


  // Define categories based on the provided schema
  const categories = [
    { _id: 'Postgraduate', name: 'Postgraduate' },
    { _id: 'Graduate', name: 'Graduate' },
    { _id: 'Diploma', name: 'Diploma' },
    { _id: 'PhD', name: 'PhD' },
    { _id: 'other', name: 'Other' },
  ];

  useEffect(() => {
    // Fetch courses and colleges when component mounts
    dispatch(getAllCourses());
    dispatch(getColleges());
  }, [dispatch]);

  useEffect(() => {
    // Show toast for errors from Redux store
    if (enquiryError) {
      toast.error(enquiryError);
    }
    if (coursesError) {
      toast.error(coursesError);
    }
    if (collegesError) {
      toast.error(collegesError);
    }
  }, [enquiryError, coursesError, collegesError]);

  const validationSchema = Yup.object({
    fName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().matches(/^\d{10}$/, 'Mobile must be 10 digits').required('Mobile is required'),
    location: Yup.string().required('Location is required'),
    category: Yup.string()
      .oneOf(['Postgraduate', 'Graduate', 'Diploma', 'PhD', 'other'])
      .required('Category is required'),
    course: Yup.string().required('Course is required'),
    school: Yup.string().required('School is required'),
    enqDescp: Yup.string().required('Description is required'),
    lookingFor: Yup.string().required('Please specify what you are looking for'),
    remarks: Yup.string(),
    leadQuality: Yup.string().oneOf(['High', 'Medium', 'Low']).required('Lead quality is required'),
  });

  const initialValues = {
    fName: '',
    email: '',
    mobile: '',
    location: '',
    category: 'Postgraduate', // Default set to Postgraduate
    course: '',
    school: '',
    remarks: '',
    enqDescp: '',
    lookingFor: '',
    leadQuality: 'High', // Default set to High
  };

  const handleCategoryChange = (categoryId, setFieldValue) => {
    setFieldValue('category', categoryId);
    setFieldValue('course', '');
  };

  // const handleSubmit = async (values, { resetForm, setSubmitting }) => {
  //   try {
  //     await dispatch(createEnquiry(values));
  //     // toast.success('Enquiry submitted successfully');
  //     resetForm();
  //   } catch (err) {
  //     console.error('Submit error:', err);
  //     toast.error(err.message || 'Error submitting enquiry');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(createEnquiry(values));
      toast.success('Enquiry submitted successfully');
      resetForm();
      navigate('/thank-you');
    } catch (err) {
      console.error('Submit error:', err);
      const errorMessage = err.message || 'Error submitting enquiry';
      toast.error(errorMessage);
      setSubmitting(false);
    }
  };

  if (enquiryLoading || coursesLoading || collegesLoading) {
    return <CircularProgress style={{ display: 'block', margin: 'auto', justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        backgroundColor: 'rgba(216, 216, 216, 0.9)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg" sx={{ background: 'transparent' }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2.3rem' },
            }}
          >
            Let's Build Greatest <br></br> Opportunity Together
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={3}
            sx={{
              backgroundColor: 'rgba(91, 246, 252, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              p: 2,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            <Box display="flex" alignItems="center">
              <Email sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body1" fontWeight="500">
                support@example.com
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Phone sx={{ mr: 1, fontSize: '1.2rem' }} />
              <Typography variant="body1" fontWeight="500">
                +91 98765 43210
              </Typography>
            </Box>
          </Box>
        </Box>

        <Card
          elevation={24}
          sx={{
            maxWidth: 900,
            margin: 'auto',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" component="h2" color="white" fontWeight="bold">
              Student Enquiry Form
            </Typography>
            <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
              Take the first step towards your dream education
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, touched, errors, isSubmitting, setFieldValue }) => {
                // Filter courses based on selected category
                const filteredCourses = courses.filter((course) => course.category === values.category);

                return (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Person sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            Personal Information
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="fName"
                          label="Full Name"
                          placeholder="Enter Your Full Name"
                          value={values.fName}
                          onChange={handleChange}
                          error={touched.fName && Boolean(errors.fName)}
                          helperText={touched.fName && errors.fName}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="email"
                          label="Email Address"
                          placeholder="Enter Your Email Address"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="mobile"
                          label="Mobile Number"
                          placeholder="Enter Your Mobile Number"
                          value={values.mobile}
                          onChange={handleChange}
                          error={touched.mobile && Boolean(errors.mobile)}
                          helperText={touched.mobile && errors.mobile}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="location"
                          label="Location"
                          placeholder="Enter Your Current Location"
                          value={values.location}
                          onChange={handleChange}
                          error={touched.location && Boolean(errors.location)}
                          helperText={touched.location && errors.location}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={2} mt={2}>
                          <School sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            Academic Information
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          name="category"
                          label="Looking For? (Category)"
                          value={values.category}
                          onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                          error={touched.category && Boolean(errors.category)}
                          helperText={touched.category && errors.category}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            startAdornment: <School sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        >
                          {categories.length > 0 ? (
                            categories.map((category) => (
                              <MenuItem key={category._id} value={category._id}>
                                {category.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled value="">
                              No Categories Found
                            </MenuItem>
                          )}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          name="course"
                          label="Select Course"
                          value={values.course}
                          onChange={handleChange}
                          error={touched.course && Boolean(errors.course)}
                          helperText={touched.course && errors.course}
                          fullWidth
                          disabled={!values.category}
                          variant="outlined"
                          InputProps={{
                            startAdornment: <School sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        >
                          {/* {filteredCourses.map((course) => (
                            <MenuItem key={course._id} value={course._id}>
                              {course.title}
                            </MenuItem>
                          ))} */}

                          {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                              <MenuItem key={course._id} value={course._id}>
                                {course.title}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled value="">
                              No Courses Found
                            </MenuItem>
                          )}

                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          select
                          name="school"
                          label="Select Preferred Institution"
                          value={values.school}
                          onChange={handleChange}
                          error={touched.school && Boolean(errors.school)}
                          helperText={touched.school && errors.school}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            startAdornment: <School sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        >

                          {colleges.length > 0 ? (
                            colleges.map((college) => (
                              <MenuItem key={college._id} value={college._id}>
                                {college.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled value="">
                              No Colleges Found
                            </MenuItem>
                          )}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center" mb={2} mt={2}>
                          <Message sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" color="primary" fontWeight="bold">
                            Enquiry Details
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="lookingFor"
                          label="What specifically are you looking for?"
                          value={values.lookingFor}
                          onChange={handleChange}
                          error={touched.lookingFor && Boolean(errors.lookingFor)}
                          helperText={touched.lookingFor && errors.lookingFor}
                          placeholder="e.g., Admission guidance, Course details, Scholarship information..."
                          multiline
                          rows={2}
                          fullWidth
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="enqDescp"
                          label="Enquiry Description"
                          value={values.enqDescp}
                          onChange={handleChange}
                          error={touched.enqDescp && Boolean(errors.enqDescp)}
                          helperText={touched.enqDescp && errors.enqDescp}
                          placeholder="Please provide detailed information about your enquiry..."
                          multiline
                          rows={4}
                          fullWidth
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="remarks"
                          label="Additional Remarks (Optional)"
                          value={values.remarks}
                          onChange={handleChange}
                          placeholder="Any additional information you'd like to share..."
                          multiline
                          rows={2}
                          fullWidth
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          select
                          name="leadQuality"
                          label="Take Your Lead Priority"
                          value={values.leadQuality}
                          onChange={handleChange}
                          error={touched.leadQuality && Boolean(errors.leadQuality)}
                          helperText={touched.leadQuality && errors.leadQuality}
                          fullWidth
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                          }}
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <Box textAlign="center" mt={3}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => window.history.back()}
                            sx={{
                              mr: 2,
                              borderRadius: '25px',
                              px: 4,
                              py: 1,
                              fontSize: '1.1rem',
                            }}
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || enquiryLoading}
                            sx={{
                              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                              borderRadius: '25px',
                              px: 4,
                              py: 1,
                              fontSize: '1.1rem',
                              boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                                boxShadow: '0 12px 35px rgba(33, 150, 243, 0.4)',
                              },
                            }}
                          >
                            {isSubmitting || enquiryLoading ? 'Submitting...' : 'Submit Enquiry'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Your dream education is just one step away. We're here to help you achieve it.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default EnquiryForm;