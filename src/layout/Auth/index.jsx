// import { Outlet } from 'react-router-dom';

// // ==============================|| LAYOUT - AUTH ||============================== //

// export default function AuthLayout() {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }


import { Outlet } from 'react-router-dom';
import ScrollTop from 'components/ScrollTop';

export default function AuthLayout() {
  return (
    <ScrollTop>
      <Outlet />
    </ScrollTop>
  );
}
