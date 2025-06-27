import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

// project imports
import Logo from 'components/logo';
import AuthCard from './AuthCard';

// assets
import AuthBackground from './AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box>
      <AuthBackground />
      <Grid container direction="column" justifyContent="flex-end">
        <Grid sx={{ px: 3, mt: 3 }} size={12}>
          <Logo to="/" />
        </Grid>
        <Grid size={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 132px)' } }}
          >
            <Grid>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
