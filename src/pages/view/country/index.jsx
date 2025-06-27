import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCountry,
  deleteCountry,
  getCountry,
  updateCountry
} from '../../container/country/slice';
import { StyledDataGrid } from '../../../assets/style/index';
import {
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import {
  Typography,
  Box,
  TextField,
  useMediaQuery,
  InputAdornment,
  Button,
  Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { pageStyles } from '../../../assets/style/commen';
import View from './view';
import AddEdit from './AddEdit';
import DeleteModel from '../../../utils/defult/DeleteModel';

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.country || { countries: [], loading: false });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = "Countries";

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const handleView = (row) => {
    setSelectedRow(row);
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

  // const handleDeleteConfirm = (data) => {
  //   if (data && data._id) {
  //     dispatch(deleteCountry(data._id));
  //     setOpenDeleteDialog(false);
  //     setDeleteData(null);
  //     dispatch(getCountry());
  //   }
  // };

  const handleDeleteConfirm = (data) => {
    if (data && data.name?.toLowerCase() === 'india') {
      alert('Cannot delete India');
      setOpenDeleteDialog(false);
      setDeleteData(null);
      return;
    }

    if (data && data._id) {
      dispatch(deleteCountry(data._id));
      setOpenDeleteDialog(false);
      setDeleteData(null);
      dispatch(getCountry());
    }
  };


  const handleSubmitForm = (values) => {
    console.log('Form Values:', values);

    const payload = {
      name: values.countryName || values.name || '',
      code: values.code || values.countryCode || '',
      isoCode: values.isoCode || '',
      dialCode: values.dialCode || '',
      currency: values.currency || '',
      image: values.image || '',
      // image is removed because it's a File object (non-serializable)
    };

    if (editData && editData._id) {
      dispatch(updateCountry({ id: editData._id, data: payload }));
    } else {
      dispatch(addCountry(payload));
    }

    dispatch(getCountry());
    setOpenDialog(false);
    setEditData(null);
  };

  const rows = useMemo(() => {
    const validCountries = Array.isArray(countries) ? countries : [];
    if (!Array.isArray(countries)) {
      console.warn('Redux state.countries is not an array:', countries);
    }
    return validCountries
      .filter((item) =>
        (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.isoCode || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((item, index) => ({
        ...item,
        id: index + 1 || item._id || '',
      }));
  }, [countries, searchQuery]);

  const memoizedEditData = useMemo(() => editData, [editData]);

  const columns = [
    { field: 'id', headerName: 'S.No', flex: 0.4, align: 'center', headerAlign: 'center' },
    {
      field: 'image',
      headerName: 'Country Flag',
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
            <img
              src={params.value}
              alt="Country Flag"
              style={{ width: 50, height: 30, objectFit: 'cover', borderRadius: 4 }}
            />
          </Box>
        ) : (
          <Typography variant="body2">No Image</Typography>
        ),
    },
    { field: 'name', headerName: 'Country Name', flex: 1 },
    { field: 'code', headerName: 'Country Code', flex: 1 },
    { field: 'isoCode', headerName: 'ISO Code', flex: 1 },
    { field: 'dialCode', headerName: 'Dial Code', flex: 1 },
    {
      field: 'isDomestic',
      headerName: 'Region Type',
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          {params.value ? 'Domestic' : 'International'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const countryName = params.row.name?.toLowerCase();
        const isIndia = countryName === 'india';

        return (
          <>
            <EyeOutlined
              style={pageStyles.viewIcon}
              onClick={() => handleView(params.row)}
            />
            {!isIndia && (
              <>
                <FormOutlined
                  style={pageStyles.editIcon}
                  onClick={() => handleEdit(params.row)}
                />
                <DeleteOutlined
                  style={pageStyles.deleteIcon}
                  onClick={() => handleDelete(params.row)}
                />
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Box sx={pageStyles.mainBox}>
      <Typography variant="h4" sx={pageStyles.title}>{title}</Typography>
      <Typography component="p" sx={pageStyles.countList}>
        <span style={{ color: "#234155", fontWeight: 600 }}>{rows.length} {title}</span> are listed below
      </Typography>

      {/* Search + New Button */}
      <Grid container spacing={2} sx={pageStyles.searchbox}>
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Name, Code, ISO"
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
                fontSize: '14px'
              },
              '& .MuiInputBase-input': {
                padding: '8px 12px'
              }
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
          Loading countries...
        </Typography>
      )}

      {!loading && rows.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No countries found.
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
        data={selectedRow}
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