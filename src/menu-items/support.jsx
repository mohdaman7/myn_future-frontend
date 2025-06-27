// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { Groups, Public } from '@mui/icons-material';

// icons
const icons = {
  Groups,
  Public,
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    // {
    //   id: 'my-team',
    //   title: 'My Team',
    //   type: 'item',
    //   url: '/my-team',
    //   icon: icons.Groups
    // },
    {
      id: 'country',
      title: 'Country',
      type: 'item',
      url: '/country',
      icon: icons.Public
    },
  ]
};

export default support;
