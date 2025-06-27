import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Grid,
  Chip,
  InputLabel,
  FormControl,
  Select,
  Box,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

const categoryOptions = ['Graduate', 'Postgraduate', 'Diploma', 'PhD', 'other'];

const AddEdit = ({ open, handleClose, editData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    duration: '',
    category: '',
    customCategory: '',
    mode: '',
    fees: '',
    syllabus: [],
    prerequisites: [],
    tags: [],
    image: null,
  });

  const [inputSyllabus, setInputSyllabus] = useState('');
  const [inputPrerequisites, setInputPrerequisites] = useState('');
  const [inputTags, setInputTags] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        customCategory: categoryOptions.includes(editData.category) ? '' : editData.category,
        category: categoryOptions.includes(editData.category) ? editData.category : 'other',
        image: null,
      });
      setPreviewImage(editData.image || null);
    } else {
      setFormData({
        title: '',
        shortDescription: '',
        fullDescription: '',
        duration: '',
        category: '',
        customCategory: '',
        mode: '',
        fees: '',
        syllabus: [],
        prerequisites: [],
        tags: [],
        image: null,
      });
      setInputSyllabus('');
      setInputPrerequisites('');
      setInputTags('');
      setPreviewImage(null);
    }

    return () => {
      if (previewImage && typeof previewImage === 'string') {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const { value } = e.target;
    if (field === 'syllabus') setInputSyllabus(value);
    else if (field === 'prerequisites') setInputPrerequisites(value);
    else if (field === 'tags') setInputTags(value);
  };

  const handleAddToArray = (field) => {
    const newItem = {
      syllabus: inputSyllabus,
      prerequisites: inputPrerequisites,
      tags: inputTags,
    }[field]?.trim();

    if (newItem) {
      const exists = formData[field].some(
        (item) => item.toLowerCase() === newItem.toLowerCase()
      );
      if (!exists) {
        setFormData((prev) => ({
          ...prev,
          [field]: [...prev[field], newItem],
        }));
        if (field === 'syllabus') setInputSyllabus('');
        else if (field === 'prerequisites') setInputPrerequisites('');
        else if (field === 'tags') setInputTags('');
      } else {
        toast.warn(`Item "${newItem}" already exists in ${field}`);
      }
    }
  };

  const handleDeleteFromArray = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddToArray(field);
    }
  };

  const handleFormSubmit = () => {
    if (
      !formData.title ||
      !formData.shortDescription ||
      !formData.fullDescription ||
      !formData.duration ||
      !formData.category ||
      !formData.mode ||
      !formData.fees ||
      (formData.category === 'other' && !formData.customCategory)
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (Number(formData.fees) <= 0) {
      toast.error('Fees must be a positive number');
      return;
    }

    const finalData = {
      ...formData,
      category: formData.category === 'other' ? formData.customCategory : formData.category,
    };

    onSubmit(finalData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{editData ? 'Edit Course' : 'Add Course'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              error={!formData.title}
              helperText={!formData.title ? 'Title is required' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Short Description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              fullWidth
              multiline
              maxRows={3}
              inputProps={{ maxLength: 300 }}
              required
              error={!formData.shortDescription}
              helperText={!formData.shortDescription ? 'Short description is required' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Full Description"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              required
              error={!formData.fullDescription}
              helperText={!formData.fullDescription ? 'Full description is required' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              fullWidth
              required
              error={!formData.duration}
              helperText={!formData.duration ? 'Duration is required' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!formData.category}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {formData.category === 'other' && (
            <Grid item xs={12}>
              <TextField
                label="Custom Category"
                name="customCategory"
                value={formData.customCategory}
                onChange={handleChange}
                fullWidth
                required
                error={!formData.customCategory}
                helperText={!formData.customCategory ? 'Custom category is required' : ''}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!formData.mode}>
              <InputLabel id="mode-label">Mode</InputLabel>
              <Select
                labelId="mode-label"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                label="Mode"
              >
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Fees"
              name="fees"
              type="number"
              value={formData.fees}
              onChange={handleChange}
              fullWidth
              required
              error={!formData.fees || Number(formData.fees) <= 0}
              helperText={
                !formData.fees
                  ? 'Fees is required'
                  : Number(formData.fees) <= 0
                    ? 'Fees must be positive'
                    : ''
              }
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Syllabus, Prerequisites, Tags Inputs */}
          {['syllabus', 'prerequisites', 'tags'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={`${field.charAt(0).toUpperCase() + field.slice(1)} (Press Enter to add)`}
                value={
                  field === 'syllabus'
                    ? inputSyllabus
                    : field === 'prerequisites'
                      ? inputPrerequisites
                      : inputTags
                }
                onChange={(e) => handleArrayInputChange(e, field)}
                onKeyPress={(e) => handleKeyPress(e, field)}
                fullWidth
                helperText={`Enter ${field} items one at a time and press Enter`}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {formData[field].map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => handleDeleteFromArray(field, index)}
                  />
                ))}
              </Box>
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Course Image
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, image: file }));
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setFormData((prev) => ({ ...prev, image: null }));
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
                  alt="Course Preview"
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

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleFormSubmit}>
          {editData ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEdit;
