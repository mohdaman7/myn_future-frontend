// material-ui
// import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project imports
import Profile from './Profile';
import Notification from './Notification';
// import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  // const downLG = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
      {/* Optional spacing for responsive layout */}
      {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}
      <Notification />
      <Profile />
      {/* {downLG && <MobileSection />} */}
    </Box>
  );
}
