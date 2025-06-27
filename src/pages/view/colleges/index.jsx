import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCollege,
  updateCollege,
  deleteCollege,
  getColleges,
  clearError,
} from '../../container/colleges/slice';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  useMediaQuery,
  CardMedia,
  CircularProgress,
  Alert,
} from '@mui/material';
import { SearchOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { pageStyles } from '../../../assets/style/commen';
import AddEdit from './AddEdit';
import View from './view';
import DeleteModel from '../../../utils/defult/DeleteModel';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const dispatch = useDispatch();
  const { colleges, loading, error } = useSelector((state) => state.college);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = 'Colleges';

  useEffect(() => {
    dispatch(getColleges({ search: searchQuery }));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleOpenDialog = (college = null) => {
    setSelectedCollege(college);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCollege(null);
  };

  const handleView = (data) => {
    setViewData(data);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setViewData(null);
  };

  const handleOpenDeleteDialog = (college) => {
    setDeleteData(college);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteData(null);
  };

  const handleDeleteConfirm = (data) => {
    if (data?._id) {
      dispatch(deleteCollege(data._id));
      handleCloseDeleteDialog();
    }
  };

  const handleSubmit = (values) => {
    if (selectedCollege?._id) {
      dispatch(updateCollege({ id: selectedCollege._id, ...values }));
    } else {
      dispatch(addCollege(values));
    }
    handleCloseDialog();
  };

  const filteredColleges = useMemo(() => Array.isArray(colleges) ? colleges : [], [colleges]);

  return (
    <Box sx={pageStyles.mainBox}>
      <Typography variant="h4" sx={pageStyles.title}>{title}</Typography>
      <Typography component="p" sx={pageStyles.countList}>
        <span style={{ color: '#234155', fontWeight: 600 }}>
          {filteredColleges.length} {title}
        </span> are listed below
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      <Box sx={pageStyles.searchbox}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Name, Code, Email, Phone, Address, Country, or Course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined style={pageStyles.newButtonIcon} />
              </InputAdornment>
            ),
          }}
          sx={{
            ...pageStyles.searchInput,
            maxHeight: 35,
            '& .MuiOutlinedInput-root': {
              height: 35,
              fontSize: '14px',
            },
            '& .MuiInputBase-input': {
              padding: '8px 12px',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
          sx={{ mt: 2, ml: 2 }}
        >
          Add College
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && filteredColleges.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No colleges found.
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredColleges.map((college) => (
          <Grid item xs={12} sm={6} md={4} key={college._id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{college.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Code: {college.code}
                </Typography>
              </CardContent>

              {college.image && (
                <CardMedia
                  sx={{ height: 140, padding: '0px 10px' }}
                  image={college.image}
                  component="img"
                  title="College Image"
                />
              )}

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Email: {college.email || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {college.phone || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {college.address || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Country: {college.country?.name || 'N/A'}
                </Typography>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button size="small" startIcon={<EyeOutlined />} onClick={() => handleView(college)}>
                  View
                </Button>
                <Button size="small" startIcon={<EditOutlined />} onClick={() => handleOpenDialog(college)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteOutlined />}
                  onClick={() => handleOpenDeleteDialog(college)}
                  color="error"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddEdit
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        editData={selectedCollege}
      />

      {viewData && (
        <View
          open={isViewOpen}
          onClose={handleViewClose}
          data={viewData}
        />
      )}

      <DeleteModel
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        data={deleteData}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default Index;
