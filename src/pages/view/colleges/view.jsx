import React from 'react';
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { viewDrawerStyles } from '../../../assets/style/commen';

const capitalize = (str) => (str ? str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : '');

const View = ({ open, onClose, data }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            sm: data && Object.keys(data).length > 6 ? '90%' : '50%',
            md: data && Object.keys(data).length > 6 ? '50%' : '30%',
          },
        },
        role: 'dialog',
        'aria-labelledby': 'college-drawer-title',
      }}
    >
      <Box sx={viewDrawerStyles.mainBox}>
        <Box sx={viewDrawerStyles.head}>
          <IconButton onClick={onClose} sx={viewDrawerStyles.closeButton} aria-label="Close drawer">
            <CloseIcon />
          </IconButton>
          <Grid sx={viewDrawerStyles.headContent}>
            <Typography id="college-drawer-title" sx={viewDrawerStyles.drawerTitle}>
              College Details
            </Typography>
          </Grid>
        </Box>

        {data ? (
          <Grid container sx={viewDrawerStyles.dataContainer} mt={2}>
            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Image</strong></Typography>
                  <img
                    src={data.image || 'https://via.placeholder.com/200x160?text=No+Image'}
                    alt={data.name ? `${data.name} image` : 'College image'}
                    style={{ maxWidth: '200px', maxHeight: '160px', borderRadius: '4px', marginTop: '4px' }}
                  />
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>College Name</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.name || '')}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>College Code</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.code || 'N/A'}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Address</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.address || 'N/A'}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Website</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.website || 'N/A'}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Country</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.country?.name || 'N/A'}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Email</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.email || 'N/A'}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Phone</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.phone || 'N/A'}</Typography>
                </Box>
              </Box>

            </Grid>
            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Description</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.desc || 'N/A'}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Category</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.category || '')}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Status</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.status || '')}</Typography>
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Courses</strong></Typography>
                  {data.courses?.length > 0 ? (
                    <List dense>
                      {data.courses.map((course) => (
                        <ListItem key={course._id || course}>
                          <ListItemText primary={course.title || 'Unknown Course'} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography sx={viewDrawerStyles.value}>No courses assigned</Typography>
                  )}
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Facilities</strong></Typography>
                  {data.facilities?.length > 0 ? (
                    <List dense>
                      {data.facilities.map((facility, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={facility} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography sx={viewDrawerStyles.value}>No facilities listed</Typography>
                  )}
                </Box>
              </Box>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Services</strong></Typography>
                  {data.services?.length > 0 ? (
                    <List dense>
                      {data.services.map((service, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={service} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography sx={viewDrawerStyles.value}>No services listed</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default View;