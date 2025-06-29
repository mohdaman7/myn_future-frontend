import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getContacts,
    deleteContact,
    deleteAllContacts,
} from '../../container/contact/slice';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { StyledDataGrid } from '../../../assets/style/index';
import { pageStyles } from '../../../assets/style/commen';
import View from './View';
import DeleteContact from '../../../utils/defult/DeleteContact';
import FormatDate from '../../../utils/defult/FormatDate';

const Index = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { contacts, loading, error } = useSelector((state) => state.contact);

    const [searchQuery, setSearchQuery] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [rowSelectionModel, setRowSelectionModel] = useState({});
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const title = "Request Call";

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const handleDeleteConfirm = async (data) => {
        if (data === 'ALL') {
            await dispatch(deleteAllContacts());
        } else if (data) {
            await dispatch(deleteContact(data._id || data.id));
        } else if (Object.keys(rowSelectionModel).length > 0) {
            for (const id of Object.keys(rowSelectionModel)) {
                await dispatch(deleteContact(id));
            }
        }
        setOpenDeleteDialog(false);
        setDeleteData(null);
        setRowSelectionModel({});
    };


    const handleDelete = (data) => {
        setDeleteData(data);
        setOpenDeleteDialog(true);
    };

    const handleDeleteAll = () => {
        setDeleteData('ALL');
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
        const list = Array.isArray(contacts) ? contacts : [];
        return list
            .filter((item) => {
                const fullname = (item.fullname || '').toLowerCase();
                const email = (item.email || '').toLowerCase();
                const mobile = (item.mobile || '').toLowerCase();
                const location = (item.location || '').toLowerCase();
                const school = (item.school || '').toLowerCase();
                const course = (item.course || '').toLowerCase();
                const query = searchQuery.toLowerCase();
                return (
                    fullname.includes(query) ||
                    mobile.includes(query) ||
                    email.includes(query) ||
                    location.includes(query) ||
                    school.includes(query) ||
                    course.includes(query)
                );
            })
            .map((item, index) => ({
                id: index + 1 || item._id,
                ...item,
            }));
    }, [contacts, searchQuery]);

    const columns = [
        { field: 'id', headerName: 'No', flex: 0.5 },
        { field: 'fullname', headerName: 'Full Name', width: 140  },
        { field: 'mobile', headerName: 'Contact', width: 140  },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'course', headerName: 'course', flex:1 },
        { field: 'school', headerName: 'school', flex:1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        {
            field: 'action',
            headerName: 'Actions',
            width: 130,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleView(params.row)}>
                        <EyeOutlined style={pageStyles.viewIcon} />
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
                <span style={{ color: '#234155', fontWeight: 600 }}>{contacts.length} {title}</span> are listed below
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search by Name, Email, Message or Status"
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
                        width: isMobile ? '100%' : '50%',
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
                    color="error"
                    onClick={() => {
                        if (Object.keys(rowSelectionModel).length > 0) {
                            setOpenDeleteDialog(true);
                        } else {
                            handleDeleteAll();
                        }
                    }}
                    disabled={contacts.length === 0 || loading}
                    sx={{ height: 35 }}
                >
                    {Object.keys(rowSelectionModel).length > 0 ? `Delete Selected (${Object.keys(rowSelectionModel).length})` : 'Delete All'}
                </Button>
            </Box>

            {loading ? (
                <Typography sx={{ mt: 2 }}>Loading contact messages...</Typography>
            ) : (
                <StyledDataGrid
                    rows={filteredRows}
                    columns={columns}
                    onRowSelectionModelChange={(newSelectionModel) => {
                        setRowSelectionModel(newSelectionModel);
                    }}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 20]}
                    autoHeight
                    disableRowSelectionOnClick
                />
            )}

            <DeleteContact
                open={openDeleteDialog}
                onClose={() => {
                    setOpenDeleteDialog(false);
                    setDeleteData(null);
                }}
                data={deleteData}
                onConfirm={handleDeleteConfirm}
                message={
                    deleteData === 'ALL'
                        ? 'Are you sure you want to delete ALL contacts?'
                        : deleteData
                            ? `Are you sure you want to delete this contact?`
                            : `Are you sure you want to delete ${Object.keys(rowSelectionModel).length} selected contacts?`
                }

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