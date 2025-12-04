// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   Typography,
//   MenuItem,
//   Select,
//   Chip,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCountry } from '../../container/country/slice';
// import { getAllCourses } from '../../container/courses/slice';
// import { toast } from 'react-toastify';
// import { getState } from '../../container/states/slice';

// // ✅ validation schema fix for category (array, not string)
// const validationSchema = Yup.object({
//   name: Yup.string().required('College name is required'),
//   code: Yup.string(),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   phone: Yup.string().required('Phone number is required'),
//   address: Yup.string(),
//   website: Yup.string().url('Invalid URL').nullable(),
//   desc: Yup.string().nullable(),
//   country: Yup.string().required('Country is required'),
//   category: Yup.array().of(Yup.string()).min(1, 'Select at least one category').required('Category is required'),
//   status: Yup.string().required('Status is required'),
//   state: Yup.string().nullable(),
//   image: Yup.mixed()
//     .nullable()
//     .test(
//       'fileType',
//       'Unsupported file format (only jpg, jpeg, png, gif allowed)',
//       value => {
//         if (!value) return true;
//         if (typeof value === 'string') return true;
//         return ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(value.type);
//       }
//     ),
//   courses: Yup.array().of(Yup.string()).min(0).nullable(),
//   facilities: Yup.array().of(Yup.string()).min(0).nullable(),
//   services: Yup.array().of(Yup.string()).min(0).nullable(),
//   map: Yup.string().nullable(),
//   visible: Yup.boolean().nullable(),
// });

// const AddEdit = ({ open, onClose, onSubmit, editData }) => {
//   const isEdit = Boolean(editData && editData._id);
//   const dispatch = useDispatch();
//   const { countries } = useSelector((state) => state.country);
//   const { allCourses: courses } = useSelector((state) => state.courses);
//   const { states } = useSelector((state) => state.states);

//   const [previewImage, setPreviewImage] = useState(null);
//   const [inputFacilities, setInputFacilities] = useState('');
//   const [inputServices, setInputServices] = useState('');

//   useEffect(() => {
//     dispatch(getCountry());
//     dispatch(getState());
//     dispatch(getAllCourses());
//   }, [dispatch]);

//   useEffect(() => {
//     if (editData?.image) {
//       setPreviewImage(editData.image);
//     } else {
//       setPreviewImage(null);
//     }
//   }, [editData]);

//   // find India safely
//   const india = countries.find(c => c.name.toLowerCase() === 'india');

//   useEffect(() => {
//     if (!open) {
//       setPreviewImage(null);
//       setInputFacilities('');
//       setInputServices('');
//     }
//   }, [open]);

//   const handleSubmit = (values, { setSubmitting }) => {
//     onSubmit({
//       ...values,
//       courses: values.courses.map(course => typeof course === 'object' ? course._id : course),
//     });
//     setSubmitting(false);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>{isEdit ? 'Edit College' : 'Add New College'}</DialogTitle>
//       <Formik
//         initialValues={{
//           name: editData?.name || '',
//           code: editData?.code || '',
//           email: editData?.email || '',
//           phone: editData?.phone || '',
//           address: editData?.address || '',
//           website: editData?.website || '',
//           desc: editData?.desc || '',
//           country: editData?.country?._id || '',
//           state: editData?.state?._id || '',
//           category: Array.isArray(editData?.category) ? editData.category : [], // ✅ fix
//           status: editData?.status || '',
//           image: null,
//           courses: editData?.courses?.map(course => course._id || course) || [],
//           facilities: editData?.facilities || [],
//           services: editData?.services || [],
//           map: editData?.map || '',
//           visible: editData?.visible !== undefined ? editData.visible : true,
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ values, errors, touched, setFieldValue, isSubmitting }) => (
//           <Form>
//             <DialogContent>
//               <Grid container spacing={3}>
//                 {/* Name */}
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     as={TextField}
//                     name="name"
//                     label="College Name *"
//                     fullWidth
//                     variant="outlined"
//                     error={touched.name && Boolean(errors.name)}
//                     helperText={touched.name && errors.name}
//                   />
//                 </Grid>

//                 {/* Code */}
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     as={TextField}
//                     name="code"
//                     label="College Code"
//                     fullWidth
//                     variant="outlined"
//                     error={touched.code && Boolean(errors.code)}
//                     helperText={touched.code && errors.code}
//                   />
//                 </Grid>

//                 {/* Email */}
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     as={TextField}
//                     name="email"
//                     label="Email *"
//                     fullWidth
//                     variant="outlined"
//                     error={touched.email && Boolean(errors.email)}
//                     helperText={touched.email && errors.email}
//                   />
//                 </Grid>

//                 {/* Phone */}
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     as={TextField}
//                     name="phone"
//                     label="Phone *"
//                     fullWidth
//                     variant="outlined"
//                     error={touched.phone && Boolean(errors.phone)}
//                     helperText={touched.phone && errors.phone}
//                   />
//                 </Grid>

//                 {/* Address */}
//                 <Grid item xs={12}>
//                   <Field
//                     as={TextField}
//                     name="address"
//                     label="Address"
//                     fullWidth
//                     variant="outlined"
//                     error={touched.address && Boolean(errors.address)}
//                     helperText={touched.address && errors.address}
//                   />
//                 </Grid>

//                 {/* Website */}
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     as={TextField}
//                     name="website"
//                     label="Website"
//                     fullWidth
//                     variant="outlined"
//                     error={touched.website && Boolean(errors.website)}
//                     helperText={touched.website && errors.website}
//                   />
//                 </Grid>

//                 {/* Country */}
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" error={touched.country && Boolean(errors.country)}>
//                     <InputLabel id="country-label">Country *</InputLabel>
//                     <Field
//                       as={Select}
//                       name="country"
//                       labelId="country-label"
//                       value={values.country}
//                       onChange={(e) => {
//                         setFieldValue('country', e.target.value);
//                         if (india && e.target.value !== india._id) {
//                           setFieldValue('state', ''); // ✅ clear state if not India
//                         }
//                       }}
//                     >
//                       {countries.map((country) => (
//                         <MenuItem key={country._id} value={country._id}>
//                           {country.name}
//                         </MenuItem>
//                       ))}
//                     </Field>
//                     {touched.country && errors.country && (
//                       <Typography color="error" variant="caption">
//                         {errors.country}
//                       </Typography>
//                     )}
//                   </FormControl>
//                 </Grid>

//                 {/* State (only if India) */}
//                 {india && values.country === india._id && (
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth variant="outlined">
//                       <InputLabel id="state-label">State</InputLabel>
//                       <Field
//                         as={Select}
//                         labelId="state-label"
//                         name="state"
//                         value={values.state || ''}
//                         onChange={(e) => setFieldValue('state', e.target.value)}
//                       >
//                         {states
//                           .filter((state) => state.country?._id === india._id)
//                           .map((state) => (
//                             <MenuItem key={state._id} value={state._id}>
//                               {state.name}
//                             </MenuItem>
//                           ))}
//                       </Field>
//                     </FormControl>
//                   </Grid>
//                 )}

//                 {/* ✅ Category multi-select */}
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" error={touched.category && Boolean(errors.category)}>
//                     <InputLabel id="category-label">Category *</InputLabel>
//                     <Field
//                       as={Select}
//                       name="category"
//                       labelId="category-label"
//                       multiple
//                       value={values.category}
//                       onChange={(e) => setFieldValue('category', e.target.value)}
//                       renderValue={(selected) => (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                           {selected.map((cat) => (
//                             <Chip key={cat} label={cat} />
//                           ))}
//                         </Box>
//                       )}
//                     >
//                       <MenuItem value="Postgraduate">Postgraduate</MenuItem>
//                       <MenuItem value="Graduate">Graduate</MenuItem>
//                       <MenuItem value="PhD">PhD</MenuItem>
//                       <MenuItem value="Diploma">Diploma</MenuItem>
//                     </Field>
//                     {touched.category && errors.category && (
//                       <Typography color="error" variant="caption">
//                         {errors.category}
//                       </Typography>
//                     )}
//                   </FormControl>
//                 </Grid>

//                 {/* Status */}
//                 <Grid item xs={12} sm={6}>
//                   <Field
//                     as={TextField}
//                     name="status"
//                     label="Status *"
//                     fullWidth
//                     variant="outlined"
//                     select
//                     error={touched.status && Boolean(errors.status)}
//                     helperText={touched.status && errors.status}
//                   >
//                     <MenuItem value="new">New</MenuItem>
//                     <MenuItem value="recommended">Recommended</MenuItem>
//                     <MenuItem value="popular">Popular</MenuItem>
//                     <MenuItem value="regular">Regular</MenuItem>
//                   </Field>
//                 </Grid>

//                 {/* Courses multi-select */}
//                 <Grid item xs={12}>
//                   <FormControl fullWidth variant="outlined" error={touched.courses && Boolean(errors.courses)}>
//                     <InputLabel id="courses-label">Courses</InputLabel>
//                     <Field
//                       as={Select}
//                       name="courses"
//                       labelId="courses-label"
//                       multiple
//                       value={values.courses}
//                       onChange={(e) => setFieldValue('courses', e.target.value)}
//                       renderValue={(selected) => (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                           {selected.map((courseId) => {
//                             const course = courses.find((c) => c._id === courseId);
//                             return course ? <Chip key={courseId} label={course.title} /> : null;
//                           })}
//                         </Box>
//                       )}
//                     >
//                       {courses.map((course) => (
//                         <MenuItem key={course._id} value={course._id}>
//                           {course.title}
//                         </MenuItem>
//                       ))}
//                     </Field>
//                     {touched.courses && errors.courses && (
//                       <Typography color="error" variant="caption">
//                         {errors.courses}
//                       </Typography>
//                     )}
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Field
//                     as={TextField}
//                     name="desc"
//                     label="Description"
//                     fullWidth
//                     variant="outlined"
//                     multiline
//                     rows={4}
//                     error={touched.desc && Boolean(errors.desc)}
//                     helperText={touched.desc && errors.desc}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Facilities (Press Enter to add)"
//                     value={inputFacilities}
//                     onChange={(e) => setInputFacilities(e.target.value)}
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault();
//                         const newItem = inputFacilities.trim();
//                         if (newItem && !values.facilities.includes(newItem)) {
//                           setFieldValue('facilities', [...values.facilities, newItem]);
//                           setInputFacilities('');
//                         } else if (newItem) {
//                           toast.warn(`Facility "${newItem}" already exists`);
//                         }
//                       }
//                     }}
//                     fullWidth
//                     helperText="Enter facilities one at a time and press Enter"
//                   />
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                     {values.facilities.map((item, index) => (
//                       <Chip
//                         key={index}
//                         label={item}
//                         onDelete={() => setFieldValue('facilities', values.facilities.filter((_, i) => i !== index))}
//                       />
//                     ))}
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Services (Press Enter to add)"
//                     value={inputServices}
//                     onChange={(e) => setInputServices(e.target.value)}
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault();
//                         const newItem = inputServices.trim();
//                         if (newItem && !values.services.includes(newItem)) {
//                           setFieldValue('services', [...values.services, newItem]);
//                           setInputServices('');
//                         } else if (newItem) {
//                           toast.warn(`Service "${newItem}" already exists`);
//                         }
//                       }
//                     }}
//                     fullWidth
//                     helperText="Enter services one at a time and press Enter"
//                   />
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//                     {values.services.map((item, index) => (
//                       <Chip
//                         key={index}
//                         label={item}
//                         onDelete={() => setFieldValue('services', values.services.filter((_, i) => i !== index))}
//                       />
//                     ))}
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Box>
//                     <Typography variant="body2" sx={{ mb: 1 }}>
//                       College Image
//                     </Typography>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(event) => {
//                         const file = event.currentTarget.files[0];
//                         setFieldValue('image', file);
//                         if (file) {
//                           const reader = new FileReader();
//                           reader.onloadend = () => {
//                             setPreviewImage(reader.result);
//                           };
//                           reader.readAsDataURL(file);
//                         } else {
//                           setPreviewImage(null);
//                         }
//                       }}
//                       style={{
//                         width: '100%',
//                         padding: '10px',
//                         border: '1px solid #ccc',
//                         borderRadius: '4px',
//                       }}
//                     />
//                     {touched.image && errors.image && (
//                       <Typography color="error" variant="caption">
//                         {errors.image}
//                       </Typography>
//                     )}
//                   </Box>
//                 </Grid>
//                 {previewImage && (
//                   <Grid item xs={12}>
//                     <Box>
//                       <Typography variant="body2" sx={{ mb: 1 }}>
//                         Preview:
//                       </Typography>
//                       <img
//                         src={previewImage}
//                         alt="College Preview"
//                         style={{
//                           width: 100,
//                           height: 60,
//                           objectFit: 'cover',
//                           borderRadius: 4,
//                           border: '1px solid #ccc',
//                         }}
//                       />
//                     </Box>
//                   </Grid>
//                 )}
//               </Grid>
//             </DialogContent>
//             <DialogActions sx={{ p: 3 }}>
//               <Button onClick={onClose} variant="outlined">
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={isSubmitting}
//                 sx={{ ml: 2 }}
//               >
//                 {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Add'}
//               </Button>
//             </DialogActions>
//           </Form>
//         )}
//       </Formik>
//     </Dialog>
//   );
// };

// export default AddEdit;











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
  MenuItem,
  Select,
  Chip,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from '../../container/country/slice';
import { getAllCourses } from '../../container/courses/slice';
import { toast } from 'react-toastify';
import { getState } from '../../container/states/slice';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('College name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string(),
  website: Yup.string().url('Invalid URL').nullable(),
  desc: Yup.string().nullable(),
  country: Yup.string().required('Country is required'),
  category: Yup.array().of(Yup.string()).min(1, 'Select at least one category').required('Category is required'),
  status: Yup.string().required('Status is required'),
  state: Yup.string().nullable(),
  image: Yup.mixed()
    .nullable()
    .test(
      'fileSize',
      'Image is too large. Maximum size is 2MB.',
      value => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return value.size <= 2 * 1024 * 1024; // 2MB
      }
    )
    .test(
      'fileType',
      'Unsupported file format (only jpg, jpeg, png, gif allowed)',
      value => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(value.type);
      }
    ),
  courses: Yup.array().of(Yup.string()).min(0).nullable(),
  facilities: Yup.array().of(Yup.string()).min(0).nullable(),
  services: Yup.array().of(Yup.string()).min(0).nullable(),
  map: Yup.string().nullable(),
  visible: Yup.boolean().nullable(),
});

const AddEdit = ({ open, onClose, onSubmit, editData }) => {
  const isEdit = Boolean(editData && editData._id);
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const { allCourses: courses } = useSelector((state) => state.courses);
  const { states } = useSelector((state) => state.states);

  const [previewImage, setPreviewImage] = useState(null);
  const [inputFacilities, setInputFacilities] = useState('');
  const [inputServices, setInputServices] = useState('');

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getState());
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (editData?.image) {
      setPreviewImage(editData.image);
    } else {
      setPreviewImage(null);
    }
  }, [editData]);

  useEffect(() => {
    if (!open) {
      setPreviewImage(null);
      setInputFacilities('');
      setInputServices('');
    }
  }, [open]);

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit({
      ...values,
      courses: values.courses.map(course => typeof course === 'object' ? course._id : course),
    });
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? 'Edit College' : 'Add New College'}</DialogTitle>
      <Formik
        initialValues={{
          name: editData?.name || '',
          email: editData?.email || '',
          phone: editData?.phone || '',
          address: editData?.address || '',
          website: editData?.website || '',
          desc: editData?.desc || '',
          country: editData?.country?._id || '',
          state: editData?.state?._id || '',
          category: Array.isArray(editData?.category) ? editData.category : [],
          status: editData?.status || '',
          image: null,
          courses: editData?.courses?.map(course => course._id || course) || [],
          facilities: editData?.facilities || [],
          services: editData?.services || [],
          map: editData?.map || '',
          visible: editData?.visible !== undefined ? editData.visible : true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="name"
                    label="College Name *"
                    fullWidth
                    variant="outlined"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email *"
                    fullWidth
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone *"
                    fullWidth
                    variant="outlined"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="address"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>

                {/* Website */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="website"
                    label="Website"
                    fullWidth
                    variant="outlined"
                    error={touched.website && Boolean(errors.website)}
                    helperText={touched.website && errors.website}
                  />
                </Grid>

                {/* Country */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={touched.country && Boolean(errors.country)}>
                    <InputLabel id="country-label">Country *</InputLabel>
                    <Field
                      as={Select}
                      name="country"
                      labelId="country-label"
                      label="Country *"
                      value={values.country || ''}
                      onChange={(e) => setFieldValue('country', e.target.value)}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country._id} value={country._id}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.country && errors.country && (
                      <Typography color="error" variant="caption">
                        {errors.country}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* State */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={touched.state && Boolean(errors.state)}>
                    <InputLabel id="state-label">State</InputLabel>
                    <Field
                      as={Select}
                      name="state"
                      labelId="state-label"
                      label="State"
                      value={values.state || ''}
                      onChange={(e) => setFieldValue('state', e.target.value)}
                    >
                      {states.map((state) => (
                        <MenuItem key={state._id} value={state._id}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.state && errors.state && (
                      <Typography color="error" variant="caption">
                        {errors.state}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Category */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={touched.category && Boolean(errors.category)}>
                    <InputLabel id="category-label">Category *</InputLabel>
                    <Field
                      as={Select}
                      name="category"
                      labelId="category-label"
                      label="Category *"
                      multiple
                      value={values.category || []}
                      onChange={(e) => setFieldValue('category', e.target.value)}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {['Graduate', 'Postgraduate', 'Diploma', 'PhD'].map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.category && errors.category && (
                      <Typography color="error" variant="caption">
                        {errors.category}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Status */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={touched.status && Boolean(errors.status)}>
                    <InputLabel id="status-label">Status *</InputLabel>
                    <Field
                      as={Select}
                      name="status"
                      labelId="status-label"
                      label="Status *"
                      value={values.status || ''}
                      onChange={(e) => setFieldValue('status', e.target.value)}
                    >
                      {['new', 'recommended', 'popular', 'regular'].map((status) => (
                        <MenuItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.status && errors.status && (
                      <Typography color="error" variant="caption">
                        {errors.status}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Courses */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={touched.courses && Boolean(errors.courses)}>
                    <InputLabel id="courses-label">Courses</InputLabel>
                    <Field
                      as={Select}
                      name="courses"
                      labelId="courses-label"
                      label="Courses"
                      multiple
                      value={values.courses || []}
                      onChange={(e) => setFieldValue('courses', e.target.value)}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected || []).map((courseId) => {
                            const course = courses.find((c) => c._id === courseId);
                            return course ? <Chip key={courseId} label={course.title} /> : null;
                          })}
                        </Box>
                      )}
                    >
                      {courses.map((course) => (
                        <MenuItem key={course._id} value={course._id}>
                          {course.title}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.courses && errors.courses && (
                      <Typography color="error" variant="caption">
                        {errors.courses}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="desc"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    error={touched.desc && Boolean(errors.desc)}
                    helperText={touched.desc && errors.desc}
                  />
                </Grid>

                {/* Facilities input + chips */}
                <Grid item xs={12}>
                  <TextField
                    label="Facilities (Press Enter to add)"
                    value={inputFacilities}
                    onChange={(e) => setInputFacilities(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const newItem = inputFacilities.trim();
                        if (newItem && !values.facilities.includes(newItem)) {
                          setFieldValue('facilities', [...(values.facilities || []), newItem]);
                          setInputFacilities('');
                        } else if (newItem) {
                          toast.warn(`Facility "${newItem}" already exists`);
                        }
                      }
                    }}
                    fullWidth
                    helperText="Enter facilities one at a time and press Enter"
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {(values.facilities || []).map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        onDelete={() =>
                          setFieldValue(
                            'facilities',
                            (values.facilities || []).filter((_, i) => i !== index)
                          )
                        }
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Services input + chips */}
                <Grid item xs={12}>
                  <TextField
                    label="Services (Press Enter to add)"
                    value={inputServices}
                    onChange={(e) => setInputServices(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const newItem = inputServices.trim();
                        if (newItem && !values.services.includes(newItem)) {
                          setFieldValue('services', [...(values.services || []), newItem]);
                          setInputServices('');
                        } else if (newItem) {
                          toast.warn(`Service "${newItem}" already exists`);
                        }
                      }
                    }}
                    fullWidth
                    helperText="Enter services one at a time and press Enter"
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {(values.services || []).map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        onDelete={() =>
                          setFieldValue(
                            'services',
                            (values.services || []).filter((_, i) => i !== index)
                          )
                        }
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Image upload + preview */}
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      College Image
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];

                        if (file) {
                          // size check: 2MB
                          if (file.size > 2 * 1024 * 1024) {
                            toast.error('Image is too large. Maximum size is 2MB. Please upload a smaller image.');
                            setFieldValue('image', null);
                            setPreviewImage(null);
                            return;
                          }

                          setFieldValue('image', file || null);
                          const reader = new FileReader();
                          reader.onloadend = () => setPreviewImage(reader.result);
                          reader.readAsDataURL(file);
                        } else {
                          setFieldValue('image', null);
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

                {previewImage && (
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Preview:
                      </Typography>
                      <img
                        src={previewImage}
                        alt="College Preview"
                        style={{
                          width: 100,
                          height: 60,
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
