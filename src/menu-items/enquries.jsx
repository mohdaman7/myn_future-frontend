// assets
import { Contacts, QuestionAnswer, Task } from '@mui/icons-material';

// icons
const icons = {
  QuestionAnswer,
  Task,
  Contacts
};

// ==============================|| MENU ITEMS - enquiries ||============================== //

const enquiries = {
  id: 'enquiries',
  title: 'Enquiries',
  type: 'group',
  children: [
    {
      id: 'enquiries',
      title: 'Enquiries',
      type: 'item',
      url: '/enquiries',
      icon: icons.QuestionAnswer
    },
    {
      id: 'follow-up',
      title: 'Follow-up',
      type: 'item',
      url: '/follow-up',
      icon: icons.Task
    },
    {
      id: 'contact',
      title: 'Contacts',
      type: 'item',
      url: '/contact',
      icon: icons.Contacts
    },

  ]
};

export default enquiries;
