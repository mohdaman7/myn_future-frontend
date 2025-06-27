import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGallery,
  deleteGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
} from '../../container/gallery/slice';
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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { pageStyles } from '../../../assets/style/commen';
import View from './view';
import AddEdit from './AddEdit';
import DeleteModel from '../../../utils/defult/DeleteModel';
import FormateDate from '../../../utils/defult/FormatDate'

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const dispatch = useDispatch();
  const { galleries, galleryCount, selectedGallery, loading, error } = useSelector((state) => state.gallery || { galleries: [], galleryCount: 0, selectedGallery: {}, loading: false, error: null });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = 'Galleries';

  useEffect(() => {
    dispatch(getGalleries());
  }, [dispatch]);

  const handleView = (row) => {
    dispatch(getGalleryById(row._id));
    setIsDrawerOpen(true);
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

  const handleDeleteConfirm = (data) => {
    if (data && data._id) {
      dispatch(deleteGallery(data._id));
      setOpenDeleteDialog(false);
      setDeleteData(null);
    }
  };

  const handleSubmitForm = (values) => {
    const payload = {
      title: values.title || '',
      from: values.from || '',
      link: values.link || '',
      date: values.date ? new Date(values.date).toISOString() : new Date().toISOString(),
      image: values.image,
    };

    if (editData && editData._id) {
      dispatch(updateGallery({ id: editData._id, data: payload }));
    } else {
      dispatch(addGallery(payload));
    }
    setOpenDialog(false);
    setEditData(null);
  };

  const rows = useMemo(() => {
    const validGalleries = Array.isArray(galleries) ? galleries : [];
    if (!Array.isArray(galleries)) {
      console.warn('Redux state.galleries is not an array:', galleries);
    }
    return validGalleries
      .filter(
        (item) =>
          (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.from || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.link || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((item, index) => ({
        ...item,
        id: index + 1 || item._id || '' ,
      }));
  }, [galleries, searchQuery]);

  const memoizedEditData = useMemo(() => editData, [editData]);

  const columns = [
    { field: 'id', headerName: 'S.No', flex: 0.4, align: 'center', headerAlign: 'center' },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
            <img
              src={params.value}
              alt="Gallery Image"
              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
            />
          </Box>
        ) : (
          <Typography variant="body2">No Image</Typography>
        ),
    },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'from', headerName: 'From', flex: 1 },
    { field: 'link', headerName: 'Link', flex: 1 },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
         {/* FormateDate {params.value ? new Date(params.value).toLocaleDateString() : 'N/A'} */}
         {FormateDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <EyeOutlined style={pageStyles.viewIcon} onClick={() => handleView(params.row)} />
          <FormOutlined style={pageStyles.editIcon} onClick={() => handleEdit(params.row)} />
          <DeleteOutlined style={pageStyles.deleteIcon} onClick={() => handleDelete(params.row)} />
        </>
      ),
    },
  ];

  return (
    <Box sx={pageStyles.mainBox}>
      <Typography variant="h4" sx={pageStyles.title}>{title}</Typography>
      <Typography component="p" sx={pageStyles.countList}>
        <span style={{ color: '#234155', fontWeight: 600 }}>{galleryCount} {title}</span> are listed below
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Search + New Button */}
      <Grid container spacing={2} sx={pageStyles.searchbox}>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Title, From, Link"
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
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={6} sx={pageStyles.newButtonBox}>
          <Button
            variant="contained"
            sx={pageStyles.newButton}
            fullWidth={isMobile}
            onClick={handleNewClick}
          >
            <PlusCircleOutlined style={pageStyles.newButtonIcon} />
            New
          </Button>
        </Grid>
      </Grid>

      {loading && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading galleries...
        </Typography>
      )}

      {!loading && rows.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No galleries found.
        </Typography>
      )}

      <StyledDataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        rows={rows}
        columns={columns}
        autoHeight
      />

      {/* Modals */}
      <AddEdit
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditData(null);
        }}
        onSubmit={handleSubmitForm}
        editData={memoizedEditData}
      />

      <View
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={selectedGallery}
      />

      <DeleteModel
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setDeleteData(null);
        }}
        data={deleteData}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default Index;