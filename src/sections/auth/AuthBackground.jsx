// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Logo from '../../assets/images/logo/mynfutur/favicon.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: -120,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        filter: 'blur(14px)',
        zIndex: -1,
        transform: 'inherit'
      }}
    >
      <img src={Logo} alt="Logo" height={600} />
    </Box>
  );
}
