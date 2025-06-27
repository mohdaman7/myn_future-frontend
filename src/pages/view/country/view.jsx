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
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{
        sx: {
          width: {
            sm: data && Object.keys(data).length > 6 ? '90%' : '50%',
            md: data && Object.keys(data).length > 6 ? '50%' : '30%',
          }
        },
      }}>
      <Box sx={viewDrawerStyles.mainBox}>
        <Box sx={viewDrawerStyles.head}>
          <IconButton onClick={onClose} sx={viewDrawerStyles.closeButton}>
            <CloseIcon />
          </IconButton>
          <Grid sx={viewDrawerStyles.headContent}>
            <Typography sx={viewDrawerStyles.drawerTitle}>Country Details</Typography>
          </Grid>
        </Box>

        {data ? (
          <Grid container sx={viewDrawerStyles.dataContainer} mt={2}>
            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Image</strong></Typography>
                  <img
                    src={data.image}
                    alt="country"
                    style={{ maxWidth: '200px', maxHeight: '160px', borderRadius: '4px', marginTop: '4px' }}
                  />
                </Box>
              </Box>

              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography variant='h5' sx={viewDrawerStyles.label}><strong>Country Name</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.name)}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Country Code</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.code}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Dial Code</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.dialCode}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>ISO Code</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.isoCode}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Currency</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.currency}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Region Type</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.isDomestic ? 'Domestic' : 'International'}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: "flex" }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Default</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.isDefault ? 'Yes' : 'No'}</Typography>
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