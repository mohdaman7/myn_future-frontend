import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from '../../container/courses/slice';
import { StyledDataGrid } from '../../../assets/style/index';
import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Typography,
  Box,
  TextField,
  useMediaQuery,
  InputAdornment,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { pageStyles } from '../../../assets/style/commen';
import View from './view';
import AddEdit from './AddEdit';
import DeleteModel from '../../../utils/defult/DeleteModel';
import FormatDate from '../../../utils/defult/FormatDate';

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const dispatch = useDispatch();
  const { allCourses:courses, loading, error } = useSelector((state) => state.courses);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = 'Courses';

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Postgraduate', label: 'Postgraduate' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'PhD', label: 'PhD' },
    { value: 'other', label: 'Other' },
  ];

  const modeOptions = [
    { value: '', label: 'All Modes' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const filteredCourses = useMemo(() => {
  return (courses || [])
    .filter((course) => {
      const matchesTitle = course?.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter
        ? course?.category?.toLowerCase() === categoryFilter.toLowerCase()
        : true;
      const matchesMode = modeFilter ? course?.mode === modeFilter : true;
      return matchesTitle && matchesCategory && matchesMode;
    })
    .map((course, index) => ({
      ...course,
      index: index + 1,
    }));
}, [courses, searchQuery, categoryFilter, modeFilter]);


  const handleView = (row) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRow(null);
  };

  const handleNewClick = () => {
    setEditData(null);
    setOpenDialog(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpenDialog(true);
  };

  const handleDelete = (row) => {
    setDeleteData(row);
    setOpenDeleteDialog(true);
  };

  const handleSubmit = (data) => {
    if (editData) {
      dispatch(updateCourse({ ...editData, ...data, id: editData._id }));
    } else {
      dispatch(addCourse(data));
    }
    setOpenDialog(false);
    dispatch(getAllCourses());
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteData(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteData?._id) {
      dispatch(deleteCourse(deleteData._id));
      dispatch(getAllCourses());
    }
    handleCloseDeleteDialog();
  };

  const columns = [
    { field: 'index', headerName: 'No.', flex: 0.3, minWidth: 50 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 40,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 120,
      renderCell: (params) =>
        params.value ? params.value.charAt(0).toUpperCase() + params.value.slice(1) : 'N/A',
    },
    {
      field: 'mode',
      headerName: 'Mode',
      flex: 1,
      minWidth: 100,
      renderCell: (params) =>
        params.value ? params.value.charAt(0).toUpperCase() + params.value.slice(1) : 'N/A',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      minWidth: 150,
      renderCell: (params) =>
        params.value ? FormatDate(new Date(params.value), 'PPP') : 'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box>
          <EyeOutlined
            onClick={() => handleView(params.row)}
            style={pageStyles.viewIcon}
            aria-label={`View course ${params.row.title || 'details'}`}
          />
          <FormOutlined
            onClick={() => handleEdit(params.row)}
            style={pageStyles.editIcon}
            aria-label={`Edit course ${params.row.title || ''}`}
          />
          <DeleteOutlined
            onClick={() => handleDelete(params.row)}
            style={pageStyles.deleteIcon}
            aria-label={`Delete course ${params.row.title || ''}`}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={pageStyles.pageWrapper}>
      <Typography variant="h4" sx={pageStyles.title}>
        {title}
      </Typography>
      <Typography component="p" sx={pageStyles.countList} mb={1}>
        <span style={{ color: '#234155', fontWeight: 600 }}>
          {filteredCourses.length} {title}
        </span>{' '}
        are listed below
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined aria-label="Search icon" />
                </InputAdornment>
              ),
            }}
            aria-label="Search courses by title"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <FormControl fullWidth>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
              aria-label="Filter by category"
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <FormControl fullWidth>
            <InputLabel id="mode-filter-label">Mode</InputLabel>
            <Select
              labelId="mode-filter-label"
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              label="Mode"
              aria-label="Filter by mode"
            >
              {modeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<PlusCircleOutlined aria-label="Add new course icon" />}
            onClick={handleNewClick}
            aria-label="Add new course"
          >
            New Course
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress aria-label="Loading courses" />
        </Box>
      ) : filteredCourses.length === 0 ? (
        <Typography>No courses available.</Typography>
      ) : (
        <StyledDataGrid
          rows={filteredCourses}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableSelectionOnClick
        />
      )}

      <View open={isDrawerOpen} data={selectedRow} handleClose={handleCloseDrawer} />

      <AddEdit
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        editData={editData}
        onSubmit={handleSubmit}
      />

      <DeleteModel
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
        data={deleteData}
      />
    </Box>
  );
};

export default Index;
