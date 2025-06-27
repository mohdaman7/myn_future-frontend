import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from '../layout/Dashboard';

// import DashboardLayout from 'layout/Dashboard';
import AuthGuard from '../utils/AuthGuard';
import { Navigate } from 'react-router';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/view/dashboard/default')));
const Profile = Loadable(lazy(() => import('../layout/Dashboard/Header/HeaderContent/Profile/profile')));

// render - Enquiries
const Enqiries = Loadable(lazy(() => import('../pages/view/enquries/index')));
const FollowUp = Loadable(lazy(() => import('../pages/view/follow-up/index')));
const Contact = Loadable(lazy(() => import('../pages/view/contact/index')));

// render - colleges
const Collegs = Loadable(lazy(() => import('../pages/view/colleges/index')));
const Intake = Loadable(lazy(() => import('../pages/view/intake/index')));
const Course = Loadable(lazy(() => import('../pages/view/courses/index')));

// render - Utitlite
const Services = Loadable(lazy(() => import('../pages/view/service/index')));
const Blog = Loadable(lazy(() => import('../pages/view/blog/index')));
const Gallery = Loadable(lazy(() => import('../pages/view/gallery/index')));

// render - Support
const MyTeam = Loadable(lazy(() => import('../pages/view/support/index')));
const Country = Loadable(lazy(() => import('../pages/view/country/index')));

// render - color
const Color = Loadable(lazy(() => import('pages/view/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/view/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/view/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/view/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to="/dashboard" replace={true} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },

    // ----------Enquiries----

    {
      path: 'enquiries',
      element: <Enqiries />
    },
    {
      path: 'follow-up',
      element: <FollowUp />
    },
    {
      path: 'contact',
      element: <Contact />
    },

    // ----------Schools----

    {
      path: 'colleges',
      element: <Collegs />
    },
    {
      path: 'intake',
      element: <Intake />
    },
    {
      path: 'course',
      element: <Course />
    },

    // ----------Services----

    {
      path: 'services',
      element: <Services />
    },
    {
      path: 'blog',
      element: <Blog />
    },
    {
      path: 'gallery',
      element: <Gallery />
    },

    // ----------Support----

    {
      path: 'my-team',
      element: <MyTeam />
    },
    {
      path: 'country',
      element: <Country />
    },

    // -------------------------------------------------------
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
