import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBlog,
  deleteBlog,
  hardDeleteBlog,
  getBlog,
  getBlogById,
  updateBlog,
} from '../../container/blog/slice';
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

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteType, setDeleteType] = useState('soft'); // 'soft' or 'hard'

  const dispatch = useDispatch();
  const { blogs, blogCount, selectedBlog, loading, error } = useSelector((state) => state.blog || { blogs: [], blogCount: 0, selectedBlog: {}, loading: false, error: null });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = 'Blogs';

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  const handleView = (row) => {
    dispatch(getBlogById(row._id));
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

  const handleDelete = (row, type = 'soft') => {
    setDeleteData(row);
    setDeleteType(type);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = (data) => {
    if (data && data._id) {
      if (deleteType === 'hard') {
        dispatch(hardDeleteBlog(data._id));
      } else {
        dispatch(deleteBlog(data._id));
      }
      setOpenDeleteDialog(false);
      setDeleteData(null);
      setDeleteType('soft');
    }
  };

  const handleSubmitForm = (values) => {
    console.log('Submitting form with values:', values);
    const payload = {
      title: values.title || '',
      shortDesc: values.shortDesc || '',
      fullDesc: values.fullDesc || '',
      link: values.link || '',
      createdBy: values.createdBy || 'admin',
      updatedBy: values.updatedBy || 'admin',
      image: values.image,
    };

    if (editData && editData._id) {
      console.log('Updating blog with payload:', { id: editData._id, data: payload });
      dispatch(updateBlog({ id: editData._id, data: payload }));
    } else {
      console.log('Adding blog with payload:', payload);
      dispatch(addBlog(payload));
    }
    setOpenDialog(false);
    setEditData(null);
  };

  const rows = useMemo(() => {
    const validBlogs = Array.isArray(blogs) ? blogs.filter(item => item && typeof item === 'object' && item.title) : [];
    if (!Array.isArray(blogs)) {
      console.warn('Redux state.blogs is not an array:', blogs);
    }
    return validBlogs
      .filter(
        (item) =>
          item &&
          typeof item === 'object' &&
          (
            (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.shortDesc || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.fullDesc || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.link || '').toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
      .map((item, index) => ({
        ...item,
        id: index + 1 || item._id,
      }));
  }, [blogs, searchQuery]);

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
              alt="Blog Image"
              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
            />
          </Box>
        ) : (
          <Typography variant="body2">No Image</Typography>
        ),
    },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'shortDesc', headerName: 'Short Description', flex: 1 },
    { field: 'link', headerName: 'Link', flex: 1 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <>
          <EyeOutlined style={pageStyles.viewIcon} onClick={() => handleView(params.row)} />
          <FormOutlined style={pageStyles.editIcon} onClick={() => handleEdit(params.row)} />
          <DeleteOutlined
            style={{ ...pageStyles.deleteIcon, color: 'red' }}
            onClick={() => handleDelete(params.row, 'hard')}
          />
        </>
      ),
    },
  ];

  return (
    <Box sx={pageStyles.mainBox}>
      <Typography variant="h4" sx={pageStyles.title}>{title}</Typography>
      <Typography component="p" sx={pageStyles.countList}>
        <span style={{ color: '#234155', fontWeight: 600 }}>{blogCount} {title}</span> are listed below
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
            placeholder="Search by Title, Short Description, Full Description, Link"
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
          Loading blogs...
        </Typography>
      )}

      {!loading && rows.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No blogs found.
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
        data={selectedBlog}
      />

      <DeleteModel
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setDeleteData(null);
          setDeleteType('soft');
        }}
        data={deleteData}
        onConfirm={handleDeleteConfirm}
        deleteType={deleteType}
      />
    </Box>
  );
};

export default Index;