// index.jsx
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../../container/enquries/slice';
import { StyledDataGrid } from '../../../assets/style/index';
import { DeleteOutlined, EyeOutlined, FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Typography,
  Box,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { pageStyles } from '../../../assets/style/commen';
import AddEditFollowUp from '../follow-up/AddEditFollowUp';
import View from './view';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const dispatch = useDispatch();
  const { enquiries, loading, error } = useSelector((state) => state.enquiries);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = 'Enquiries';

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const handleOpenDialog = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEnquiry(null);
  };

  const handleView = (data) => {
    setViewData(data);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setViewData(null);
  };

  const rows = useMemo(() => {
    const validEnquiries = Array.isArray(enquiries)
      ? enquiries.filter((item) => item && typeof item === 'object')
      : [];

    return validEnquiries
      .filter((item) => {
        const search = searchQuery.toLowerCase();
        return (
          String(item.enqNo || '').toLowerCase().includes(search) ||
          String(item.fName || '').toLowerCase().includes(search) ||
          String(item.email || '').toLowerCase().includes(search) ||
          String(item.mobile || '').toLowerCase().includes(search) ||
          String(item.location || '').toLowerCase().includes(search)
        );
      })
      .map((item) => ({
        ...item,
        id: item._id,
      }));
  }, [enquiries, searchQuery]);

  const columns = [
    { field: 'enqNo', headerName: 'S.No', flex: 0.5, align: 'center', headerAlign: 'center' },
    { field: 'fName', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'mobile', headerName: 'Phone', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'leadQuality', headerName: 'Lead Quality', flex: 1.5 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <EyeOutlined style={pageStyles.viewIcon} onClick={() => handleView(params.row)} />
          <FileAddOutlined
            style={pageStyles.followUpIcon}
            onClick={() => handleOpenDialog(params.row)}
          />
        </>
      ),
    },
  ];

  return (
    <Box sx={pageStyles.mainBox}>
      <Typography variant="h4" sx={pageStyles.title}>{title}</Typography>
      <Typography component="p" sx={pageStyles.countList}>
        <span style={{ color: '#234155', fontWeight: 600 }}>{enquiries.length} {title}</span> are listed below
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
          placeholder="Search by Name, Email, Phone, Message"
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

      {loading && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading enquiries...
        </Typography>
      )}

      {!loading && rows.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No enquiries found.
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
      {selectedEnquiry && (
        <AddEditFollowUp
          open={openDialog}
          onClose={handleCloseDialog}
          enquiry={selectedEnquiry} // Pass as `enquiry` for creating new follow-ups
        />
      )}

      {viewData && (
        <View
          open={isViewOpen}
          onClose={handleViewClose}
          data={viewData}
        />
      )}
    </Box>
  );
};

export default Index;