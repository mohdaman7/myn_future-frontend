import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFollowUps,
  deleteFollowUp,
} from '../../container/follow-up/slice';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DeleteOutlined, EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { StyledDataGrid } from '../../../assets/style/index';
import { pageStyles } from '../../../assets/style/commen';
import AddEditFollowUp from './AddEditFollowUp';
import View from './view';
import DeleteModel from '../../../utils/defult/DeleteModel';
import FormatDate from '../../../utils/defult/FormatDate';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { followUps, loading, error } = useSelector((state) => state.followUp);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const title = "Follow Up"

  useEffect(() => {
    dispatch(getFollowUps());
  }, [dispatch]);

  const handleOpenDialog = (followUp) => {
    setSelectedFollowUp(followUp);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFollowUp(null);
  };

  const handleDeleteConfirm = async (data) => {
    await dispatch(deleteFollowUp(data._id || data.id));
    setOpenDeleteDialog(false);
    setDeleteData(null);
  };

  const handleDelete = (data) => {
    setDeleteData(data);
    setOpenDeleteDialog(true);
  };

  const handleView = (data) => {
    setViewData(data);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setViewData(null);
  };

  const filteredRows = useMemo(() => {
    const list = Array.isArray(followUps) ? followUps : [];
    return list
      .filter((item) => {
        const details = (item.followUpDetails || '').toLowerCase();
        const remarks = (item.remarks || '').toLowerCase();
        const enqNo = item.enqId?.enqNo?.toLowerCase() || '';
        const fName = item.enqId?.fName?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        return (
          details.includes(query) ||
          remarks.includes(query) ||
          enqNo.includes(query) ||
          fName.includes(query)
        );
      })
      .map((item, index) => ({
        id: item._id || index,
        ...item,
        enqNo: item.enqId?.enqNo || 'N/A',
        fName: item.enqId?.fName || 'N/A',
      }));
  }, [followUps, searchQuery]);

  const columns = [
    { field: 'enqNo', headerName: 'Enquiry No', flex: 1 },
    { field: 'fName', headerName: 'Name', flex: 1 },
    { field: 'followUpDetails', headerName: 'Details', flex: 1 },
    {
      field: 'nextContactDate',
      headerName: 'Next Contact Date',
      flex: 1,
      renderCell: (params) => FormatDate(params.value),
    },
    { field: 'remarks', headerName: 'Remarks', flex: 1 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <EyeOutlined style={pageStyles.viewIcon} />
          </IconButton>
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <EditOutlined style={pageStyles.editIcon} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteOutlined style={pageStyles.deleteIcon} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={pageStyles.mainBox}>
      <Typography variant="h4" sx={pageStyles.title}>{title}</Typography>
      <Typography component="p" sx={pageStyles.countList}>
        <span style={{ color: '#234155', fontWeight: 600 }}>{followUps.length} {title}</span> are listed below
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={pageStyles.searchbox}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Details, Remarks, Enquiry No or Name"
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
      </Box>

      {loading ? (
        <Typography sx={{ mt: 2 }}>Loading follow-ups...</Typography>
      ) : (
        <StyledDataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
        />
      )}

      <AddEditFollowUp
        open={openDialog}
        followUp={selectedFollowUp}
        onClose={handleCloseDialog}
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

      <View
        open={isViewOpen}
        onClose={handleViewClose}
        data={viewData}
      />
    </Box>
  );
};

export default Index;