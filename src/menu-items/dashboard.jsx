import { DashboardOutlined, ShopOutlined } from '@ant-design/icons';
import { AddOutlined } from '@mui/icons-material';

const icons = {
  DashboardOutlined,
  ShopOutlined,AddOutlined
};

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
   {
  id: 'store-management',
  title: 'Store Management',
  type: 'collapse',
  icon: icons.ShopOutlined,
  children: [
    {
      id: 'create-store',
      title: 'Create Store',
      type: 'item',
      url: '/store/create',
      icon: icons.AddOutlined
    },
    {
     id: 'store-list',
      title: 'Store List',
      type: 'item',
      url: '/store/list',
      icon: icons.ShopOutlined
    }
  ]
}
  ]
};

export default dashboard;