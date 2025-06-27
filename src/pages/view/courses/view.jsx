import React from 'react';
import { Drawer, Typography, Box, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { viewDrawerStyles } from '../../../assets/style/commen';
import { format, isValid } from 'date-fns';

const capitalize = (str) =>
  typeof str === 'string' && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : 'N/A';

const View = ({ open, handleClose, data }) => {
  if (!data) {
    return (
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={viewDrawerStyles.mainBox}>
          <Box sx={viewDrawerStyles.head}>
            <IconButton
              onClick={handleClose}
              sx={viewDrawerStyles.closeButton}
              aria-label="Close drawer"
            >
              <CloseIcon />
            </IconButton>
            <Grid sx={viewDrawerStyles.headContent}>
              <Typography sx={viewDrawerStyles.drawerTitle}>Course Details</Typography>
            </Grid>
          </Box>
          <Typography sx={{ p: 2 }}>No course data available.</Typography>
        </Box>
      </Drawer>
    );
  }

  const drawerTitle = data.isDomestic ? 'Domestic Course Details' : 'International Course Details';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: {
            sm: Object.keys(data).length > 8 ? '90%' : '50%', // Adjusted for additional fields
            md: Object.keys(data).length > 8 ? '50%' : '30%',
          }
        },
      }}
    >
      <Box sx={viewDrawerStyles.mainBox}>
        <Box sx={viewDrawerStyles.head}>
          <IconButton
            onClick={handleClose}
            sx={viewDrawerStyles.closeButton}
            aria-label="Close drawer"
          >
            <CloseIcon />
          </IconButton>
          <Grid sx={viewDrawerStyles.headContent}>
            <Typography sx={viewDrawerStyles.drawerTitle}>{drawerTitle}</Typography>
          </Grid>
        </Box>



        <Grid container sx={viewDrawerStyles.dataContainer} mt={2}>
          <Grid item xs={12} md={6}>
            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Title</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>{capitalize(data.title)}</Typography>
              </Box>
            </Box>

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

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Short Description</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {data.shortDescription || 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Full Description</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {data.fullDescription || 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Duration</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>{data.duration || 'N/A'}</Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Created At</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {data.createdAt && isValid(new Date(data.createdAt))
                    ? format(new Date(data.createdAt), 'PPP')
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Category</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>{capitalize(data.category)}</Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Mode</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>{capitalize(data.mode)}</Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Fees</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  ₹ {data.fees ? Number(data.fees).toLocaleString() : 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Syllabus</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {Array.isArray(data.syllabus) && data.syllabus.length > 0
                    ? data.syllabus.join(', ')
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Prerequisites</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {Array.isArray(data.prerequisites) && data.prerequisites.length > 0
                    ? data.prerequisites.join(', ')
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Tags</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {Array.isArray(data.tags) && data.tags.length > 0
                    ? data.tags.join(', ')
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>

            <Box mb={2} display="flex" alignItems="center">
              <ArrowRightIcon fontSize="small" aria-hidden="true" />
              <Box>
                <Typography sx={viewDrawerStyles.label}>
                  <strong>Updated At</strong>
                </Typography>
                <Typography sx={viewDrawerStyles.value}>
                  {data.updatedAt && isValid(new Date(data.updatedAt))
                    ? format(new Date(data.updatedAt), 'PPP')
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default View;