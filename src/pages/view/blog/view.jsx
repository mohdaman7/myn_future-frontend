import React from 'react';
import {
  Drawer, Typography, Box, IconButton, Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { viewDrawerStyles } from '../../../assets/style/commen';

const capitalize = (str) => str?.toLowerCase()?.replace(/\b\w/g, c => c.toUpperCase()) || '';

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
          }
        },
      }}
    >
      <Box sx={viewDrawerStyles.mainBox}>
        <Box sx={viewDrawerStyles.head}>
          <IconButton onClick={onClose} sx={viewDrawerStyles.closeButton}>
            <CloseIcon />
          </IconButton>
          <Grid sx={viewDrawerStyles.headContent}>
            <Typography sx={viewDrawerStyles.drawerTitle}>Blog Details</Typography>
          </Grid>
        </Box>

        {data ? (
          <Grid container sx={viewDrawerStyles.dataContainer} mt={2}>
            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Image</strong></Typography>
                  {data.image ? (
                    <img
                      src={data.image}
                      alt="Blog"
                      style={{ maxWidth: '200px', maxHeight: '160px', borderRadius: '4px', marginTop: '4px' }}
                    />
                  ) : (
                    <Typography>No Image</Typography>
                  )}
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Title</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.title)}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Short Description</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.shortDesc)}</Typography>
                </Box>
              </Box>


            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Link</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>
                    {data.link ? (
                      <a href={data.link} target="_blank" rel="noopener noreferrer">
                        {data.link}
                      </a>
                    ) : (
                      'No Link'
                    )}
                  </Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Full Description</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.fullDesc}</Typography>
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