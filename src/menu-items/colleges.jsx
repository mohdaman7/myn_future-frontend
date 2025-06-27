// assent
import { Business, School,PlaylistAddCheck } from '@mui/icons-material';

// icons
const icons = {
    Business,
    School,
    PlaylistAddCheck
};

// ==============================|| MENU ITEMS - colleges ||============================== //

const colleges = {
    id: 'colleges',
    title: 'Colleges',
    type: 'group',
    children: [
        
        {
            id: 'colleges',
            title: 'Colleges',
            type: 'item',
            url: '/colleges',
            icon: icons.Business
        },
        {
            id: 'intake',
            title: 'Intake',
            type: 'item',
            url: '/intake',
            icon: icons.PlaylistAddCheck
        },
        {
            id: 'course',
            title: 'Courses',
            type: 'item',
            url: '/course',
            icon: icons.School
        },
    ]
};

export default colleges;
