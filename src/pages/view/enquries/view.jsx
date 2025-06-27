import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import FormatDate from '../../../utils/defult/FormatDate';

const View = ({ open, onClose, data }) => {
  const { loading, error } = useSelector((state) => state.enquiries);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="view-enquiry-dialog-title"
      PaperProps={{
        sx: {
          margin: isMobile ? 1 : 3,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle id="view-enquiry-dialog-title">
        Enquiry Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: isMobile ? 2 : 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : data ? (
          <Box>
            <Card sx={{ mb: 3, backgroundColor: theme.palette.grey[50] }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="textSecondary">
                      Enquiry No
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {data.enqNo || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="textSecondary">
                      Name
                    </Typography>
                    <Typography variant="h6">
                      {data.fName || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="textSecondary">
                      Phone
                    </Typography>
                    <Typography variant="h6">
                      {data.mobile ? (
                        <Typography
                          component="a"
                          href={`tel:${data.mobile}`}
                          variant="h6"
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                              color: 'primary.dark',
                            },
                          }}
                        >
                          {data.mobile}
                        </Typography>
                      ) : (
                        'N/A'
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="caption" color="textSecondary">
                      Email
                    </Typography>
                    <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
                      {data.email ? (
                        <Typography
                          component="a"
                          href={`mailto:${data.email}`}
                          variant="h6"
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            wordBreak: 'break-word',
                            '&:hover': {
                              textDecoration: 'underline',
                              color: 'primary.dark',
                            },
                          }}
                        >
                          {data.email}
                        </Typography>
                      ) : (
                        'N/A'
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="caption" color="textSecondary">
                      Location
                    </Typography>
                    <Typography variant="h6">
                      {data.location || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        width: isMobile ? '35%' : '25%',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Lead Quality
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>
                      {data.leadQuality || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Category
                    </TableCell>
                    <TableCell>
                      {data.category || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Course
                    </TableCell>
                    <TableCell>
                      {data.course.title || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      School
                    </TableCell>
                    <TableCell>
                      {data.school.name || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Looking For
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>
                      {data.lookingFor || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Enquiry Description
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>
                      {data.enqDescp || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Remarks
                    </TableCell>
                    <TableCell sx={{ wordBreak: 'break-word' }}>
                      {data.remarks || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Created At
                    </TableCell>
                    <TableCell>
                      {FormatDate(data.createdAt)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography>No data available</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default View;