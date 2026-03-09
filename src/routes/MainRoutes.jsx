import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from 'utils/ProtectedRoute';
  
// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
import StoreList from 'pages/store/StoreList';
import CreateStore from 'pages/store/CreateStore';
import StoreView from "pages/store/StoreView";
import StoreEdit from "pages/store/StoreEdit";
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

 
// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="/login" />
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <ProtectedRoute>
              <DashboardDefault />
            </ProtectedRoute>
          )
        }
      ]
    },

    {
      path: 'store',
      children: [
        {
          path: 'list',
          element: <StoreList />
        },
        {
          path: 'create',
          element: <CreateStore />
        },
        {
          path: 'view/:id',
          element: <StoreView />
        },
        {
          path: 'edit/:id',
          element: <StoreEdit />
        }
      ]
    }
  ]
};
export default MainRoutes;