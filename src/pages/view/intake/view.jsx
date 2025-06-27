import React from 'react';
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Grid,
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
          width: { sm: '50%', md: '30%' },
        },
      }}
    >
      <Box sx={viewDrawerStyles.mainBox}>
        <Box sx={viewDrawerStyles.head}>
          <IconButton onClick={onClose} sx={viewDrawerStyles.closeButton}>
            <CloseIcon />
          </IconButton>
          <Grid sx={viewDrawerStyles.headContent}>
            <Typography sx={viewDrawerStyles.drawerTitle}>Intake Details</Typography>
          </Grid>
        </Box>

        {data ? (
          <Grid container sx={viewDrawerStyles.dataContainer} mt={2}>
            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>College</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>
                    {capitalize(data.college?.name || data.college || '-')}
                  </Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Intake Month</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.intakeMonth || '-')}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Intake Year</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.intakeYear || '-'}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Deadline Date</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>
                    {data.deadlineDate ? new Date(data.deadlineDate).toLocaleDateString() : '-'}
                  </Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Status</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{capitalize(data.status || '-')}</Typography>
                </Box>
              </Box>

              <Box mb={2} style={{ display: 'flex' }}>
                <ArrowRightIcon fontSize="small" />
                <Box>
                  <Typography sx={viewDrawerStyles.label}><strong>Visible</strong></Typography>
                  <Typography sx={viewDrawerStyles.value}>{data.visible ? 'Yes' : 'No'}</Typography>
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