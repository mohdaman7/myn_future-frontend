// // material-ui
// import { useTheme } from '@mui/material/styles';

// // logo images
// import logo from '../../assets/images/logo/edspiria/logo.png';
// import logoDark from '../../assets/images/logo/edspiria/logo.png';

// // import config from '../../config';

// // ==============================|| LOGO ICON SVG ||============================== //

// export default function LogoIcon() {

//   // const logo = config.mobilelogo;
//   // const logoDark = config.mobilelogo;

//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';

//   return (
//     <img
//       src={isDark ? logo : logoDark}
//       alt="Edspiria"
//       style={{ display: 'block', width: 'auto', height: '37px' }}
//     />
//   );

// }



import logo from '../../assets/images/logo/mynfutur/favicon.png';

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {


  return (
    <img
      src={logo}
      alt="Edspiria"
      style={{ display: 'block', width: 'auto', height: '37px' }}
    />
  );

}

