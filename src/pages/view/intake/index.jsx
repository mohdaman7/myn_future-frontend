import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addIntake,
  deleteIntake,
  getIntakes,
  updateIntake,
  resetError,
} from '../../container/intake/slice';
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
import { toast } from 'react-toastify';

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const dispatch = useDispatch();
  const { intakes, loading, error } = useSelector((state) => state.intakes || { intakes: [], loading: false, error: null });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = "Intakes";

  useEffect(() => {
    dispatch(getIntakes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [error, dispatch]);

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

  const handleDeleteConfirm = (data) => {
    if (data?._id) {
      dispatch(deleteIntake(data._id));
      setOpenDeleteDialog(false);
      setDeleteData(null);
    }
  };

  const handleSubmitForm = (values) => {
    console.log('Form Values:', values);
    const payload = {
      college: values.college,
      intakeMonth: values.intakeMonth,
      intakeYear: values.intakeYear,
      deadlineDate: values.deadlineDate,
      status: values.status,
      visible: values.visible,
    };
    if (editData?._id) {
      dispatch(updateIntake({ id: editData._id, ...payload }));
    } else {
      dispatch(addIntake(payload));
    }
    setOpenDialog(false);
    setEditData(null);
  };

  const rows = useMemo(() => {
    const validIntakes = Array.isArray(intakes) ? intakes : [];
    if (!Array.isArray(intakes)) {
      console.warn('Redux state.intakes is not an array:', intakes);
    }
    return validIntakes
      .filter((item) => {
        const college = (item.college?.name || '').toLowerCase();
        const month = (item.intakeMonth || '').toLowerCase();
        const year = (item.intakeYear || '').toString();
        const status = (item.status || '').toLowerCase();
        const visible = item.visible ? 'yes' : 'no';
        const query = searchQuery.toLowerCase();
        return (
          college.includes(query) ||
          month.includes(query) ||
          year.includes(query) ||
          status.includes(query) ||
          visible.includes(query)
        );
      })
      .map((item, index) => ({
        ...item,
        id: index + 1 || item._id,
      }));
  }, [intakes, searchQuery]);

  const memoizedEditData = useMemo(() => editData, [editData]);

  const columns = [
    { field: 'id', headerName: 'S.No', flex: 0.4, align: 'center', headerAlign: 'center' },
    {
      field: 'college',
      headerName: 'College',
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          {params.value?.name || '-'}
        </Typography>
      ),
    },
    { field: 'intakeMonth', headerName: 'Intake Month', flex: 1 },
    { field: 'intakeYear', headerName: 'Intake Year', flex: 1 },
    {
      field: 'deadlineDate',
      headerName: 'Deadline Date',
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          {params.value ? new Date(params.value).toLocaleDateString() : '-'}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          {params.value ? params.value.charAt(0).toUpperCase() + params.value.slice(1) : '-'}
        </Typography>
      ),
    },
    {
      field: 'visible',
      headerName: 'Visible',
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          {params.value ? 'Yes' : 'No'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <EyeOutlined
            style={pageStyles.viewIcon}
            onClick={() => handleView(params.row)}
          />
          <FormOutlined
            style={pageStyles.editIcon}
            onClick={() => handleEdit(params.row)}
          />
          <DeleteOutlined
            style={pageStyles.deleteIcon}
            onClick={() => handleDelete(params.row)}
          />
        </>
      ),
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
            placeholder="Search by College, Month, Year, Status, Visible"
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
          Loading intakes...
        </Typography>
      )}

      {!loading && rows.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No intakes found.
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
        loading={loading}
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