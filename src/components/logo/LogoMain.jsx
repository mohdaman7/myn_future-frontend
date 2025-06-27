// // material-ui
// import { useTheme } from '@mui/material/styles';

// // logo images
// // import logo from '../../assets/images/logo/edspiria/long.png';
// // import logoDark from '../../assets/images/logo/edspiria/long.png';

// import config from '../../config';

// // ==============================|| LOGO COMPONENT ||============================== //

// export default function LogoMain() {

//   const theme = useTheme();
  
//   const logo = config.weblogo;

//   const logoDark = config.weblogo;

//   const isDark = theme.palette.mode === 'dark';

//   return (
//     <img
//       src={isDark ? logoDark : logo}
//       alt="Edspiria"
//       style={{ display: 'block', width: 'auto', height: '35px' }}
//     />
//   );
// }


import logo from '../../assets/images/logo/mynfutur/MYNname-LOGO.png';



// ==============================|| LOGO COMPONENT ||============================== //

export default function LogoMain() {

  return (
    <img
      src={logo}
      alt="Edspiria"
      style={{ display: 'block', width: 'auto', height: '35px' }}
    />
  );
}
