// // material-ui
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid2';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project imports
// import MainCard from 'components/MainCard';
// import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
// import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
// import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
// import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
// import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
// import OrdersTable from 'sections/dashboard/default/OrdersTable';

// // assets
// import GiftOutlined from '@ant-design/icons/GiftOutlined';
// import MessageOutlined from '@ant-design/icons/MessageOutlined';
// import SettingOutlined from '@ant-design/icons/SettingOutlined';

// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// // avatar style
// const avatarSX = {
//   width: 36,
//   height: 36,
//   fontSize: '1rem'
// };

// // action style
// const actionSX = {
//   mt: 0.75,
//   ml: 1,
//   top: 'auto',
//   right: 'auto',
//   alignSelf: 'flex-start',
//   transform: 'none'
// };

// // redux
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { Contacts, QuestionAnswer, Task, Business, School, Collections, SpaceDashboard, Assignment } from '@mui/icons-material';
// import { getEnquiryCount } from '../../container/enquries/slice';
// import { getFollowUps } from '../../container/follow-up/slice';
// import { getContacts } from '../../container/contact/slice';
// import { getCourse } from '../../container/courses/slice';
// import { getColleges } from '../../container/colleges/slice';
// import { getServices } from '../../container/service/slice';
// import { getBlog } from '../../container/blog/slice';
// import { getGalleries } from '../../container/gallery/slice';
// // ==============================|| DASHBOARD - DEFAULT ||============================== //

// export default function DashboardDefault() {
//   const dispatch = useDispatch();

//   const { enquiryCount } = useSelector((state) => state.enquiries);
//   const { followUps } = useSelector((state) => state.followUp);
//   const { contacts } = useSelector((state) => state.contact);
//   const { courses } = useSelector((state) => state.courses);
//   const { colleges } = useSelector((state) => state.college);
//   const { services } = useSelector((state) => state.services);
//   const { blogs } = useSelector((state) => state.blog);
//   const { galleries } = useSelector((state) => state.gallery);

//   useEffect(() => {
//     dispatch(getEnquiryCount());
//     dispatch(getFollowUps());
//     dispatch(getContacts());
//     dispatch(getCourse());
//     dispatch(getColleges());
//     dispatch(getServices());
//     dispatch(getBlog());
//     dispatch(getGalleries());
//   }, [dispatch]);

//   // Current counts
//   const followUpCount = followUps?.length || 0;
//   const contactsCount = contacts?.length || 0;
//   const coursesCount = courses?.length || 0;
//   const collegesCount = colleges?.length || 0;
//   const servicesCount = services?.length || 0;
//   const blogsCount = blogs?.length || 0;
//   const galleriesCount = galleries?.length || 0;

//   // Previous counts (dummy values or fetch from backend in future)
//   const previousEnquiryCount = 1000;
//   const previousFollowUps = 200;
//   const previousContacts = 400;
//   const previousCourses = 25;
//   const previousColleges = 15;
//   const previousServices = 10;
//   const previousBlogs = 20;
//   const previousGalleries = 30;

//   // Percentage calculations
//   const enquiryPercentage = previousEnquiryCount
//     ? ((enquiryCount - previousEnquiryCount) / previousEnquiryCount) * 100
//     : 0;
//   const followUpPercentage = previousFollowUps
//     ? ((followUpCount - previousFollowUps) / previousFollowUps) * 100
//     : 0;
//   const contactsPercentage = previousContacts
//     ? ((contactsCount - previousContacts) / previousContacts) * 100
//     : 0;
//   const coursesPercentage = previousCourses
//     ? ((coursesCount - previousCourses) / previousCourses) * 100
//     : 0;
//   const collegesPercentage = previousColleges
//     ? ((collegesCount - previousColleges) / previousColleges) * 100
//     : 0;
//   const servicesPercentage = previousServices
//     ? ((servicesCount - previousServices) / previousServices) * 100
//     : 0;
//   const blogsPercentage = previousBlogs
//     ? ((blogsCount - previousBlogs) / previousBlogs) * 100
//     : 0;
//   const galleriesPercentage = previousGalleries
//     ? ((galleriesCount - previousGalleries) / previousGalleries) * 100
//     : 0;

//   return (
//     <Grid container rowSpacing={4.5} columnSpacing={2.75}>
//       {/* row 1 */}
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Enquiries"
//           count={enquiryCount}
//           percentage={enquiryPercentage.toFixed(2)}
//           isLoss={enquiryPercentage < 0}
//           icon={<Assignment />}
//         />
//       </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Follow Ups"
//           count={followUpCount}
//           percentage={followUpPercentage.toFixed(2)}
//           isLoss={followUpPercentage < 0}
//           icon={<QuestionAnswer />}
//         />      </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Contacts"
//           count={contactsCount}
//           percentage={contactsPercentage.toFixed(2)}
//           isLoss={contactsPercentage < 0}
//           icon={<Contacts />}
//         />      </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Courses"
//           count={coursesCount}
//           percentage={coursesPercentage.toFixed(2)}
//           isLoss={coursesPercentage < 0}
//           icon={<School />}
//         />      </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Colleges"
//           count={collegesCount}
//           percentage={collegesPercentage.toFixed(2)}
//           isLoss={collegesPercentage < 0}
//           icon={<Business />}
//         />      </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Services"
//           count={servicesCount}
//           percentage={servicesPercentage.toFixed(2)}
//           isLoss={servicesPercentage < 0}
//           icon={<Task />}
//         />      </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Blogs"
//           count={blogsCount}
//           percentage={blogsPercentage.toFixed(2)}
//           isLoss={blogsPercentage < 0}
//           icon={<SpaceDashboard />}
//         />      </Grid>
//       <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//         <AnalyticEcommerce
//           title="Galleries"
//           count={galleriesCount}
//           percentage={galleriesPercentage.toFixed(2)}
//           isLoss={galleriesPercentage < 0}
//           icon={<Collections />}
//         />      </Grid>
//       <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
//       {/* row 2 */}
//       {/* <Grid size={{ xs: 12, md: 7, lg: 8 }}>
//         <MainCard content={false}>
//           <OrdersTable />
//         </MainCard>
//       </Grid> */}
//       {/* <Grid size={{ xs: 12, md: 5, lg: 4 }}>
//         <MainCard  content={false}>
//           <List
//             component="nav"
//             sx={{
//               px: 0,
//               py: 0,
//               '& .MuiListItemButton-root': {
//                 py: 1.5,
//                 px: 2,
//                 '& .MuiAvatar-root': avatarSX,
//                 '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
//               }
//             }}
//           >
//             <ListItem
//               component={ListItemButton}
//               divider
//               secondaryAction={
//                 <Stack sx={{ alignItems: 'flex-end' }}>
//                   <Typography variant="subtitle1" noWrap>
//                     + $1,430
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     78%
//                   </Typography>
//                 </Stack>
//               }
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
//                   <GiftOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
//             </ListItem>
//             <ListItem
//               component={ListItemButton}
//               divider
//               secondaryAction={
//                 <Stack sx={{ alignItems: 'flex-end' }}>
//                   <Typography variant="subtitle1" noWrap>
//                     + $302
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     8%
//                   </Typography>
//                 </Stack>
//               }
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
//                   <MessageOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
//             </ListItem>
//             <ListItem
//               component={ListItemButton}
//               secondaryAction={
//                 <Stack sx={{ alignItems: 'flex-end' }}>
//                   <Typography variant="subtitle1" noWrap>
//                     + $682
//                   </Typography>
//                   <Typography variant="h6" color="secondary" noWrap>
//                     16%
//                   </Typography>
//                 </Stack>
//               }
//             >
//               <ListItemAvatar>
//                 <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
//                   <SettingOutlined />
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
//             </ListItem>
//           </List>
//         </MainCard>
//         <MainCard sx={{ mt: 2 }}>
//           <Stack sx={{ gap: 3 }}>
//             <Grid container justifyContent="space-between" alignItems="center">
//               <Grid>
//                 <Stack>
//                   <Typography variant="h5" noWrap>
//                     Help & Support Chat
//                   </Typography>
//                   <Typography variant="caption" color="secondary" noWrap>
//                     Typical replay within 5 min
//                   </Typography>
//                 </Stack>
//               </Grid>
//               <Grid>
//                 <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
//                   <Avatar alt="Remy Sharp" src={avatar1} />
//                   <Avatar alt="Travis Howard" src={avatar2} />
//                   <Avatar alt="Cindy Baker" src={avatar3} />
//                   <Avatar alt="Agnes Walker" src={avatar4} />
//                 </AvatarGroup>
//               </Grid>
//             </Grid>
//             <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
//               Need Help?
//             </Button>
//           </Stack>
//         </MainCard>
//       </Grid> */}
//     </Grid>
//   );
// }


// material-ui
import Grid from '@mui/material/Grid';

// project imports
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// icons
import {
  Contacts,
  QuestionAnswer,
  School,
  Business,
  Collections,
  Assignment,
  SpaceDashboard,
  RssFeed
} from '@mui/icons-material';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getEnquiryCount } from '../../container/enquries/slice';
import { getFollowUps } from '../../container/follow-up/slice';
import { getContacts } from '../../container/contact/slice';
import { getAllCourses } from '../../container/courses/slice';
import { getColleges } from '../../container/colleges/slice';
import { getServices } from '../../container/service/slice';
import { getBlog } from '../../container/blog/slice';
import { getGalleries } from '../../container/gallery/slice';

export default function DashboardDefault() {
  const dispatch = useDispatch();

  const { enquiryCount } = useSelector((state) => state.enquiries);
  const { followUps } = useSelector((state) => state.followUp);
  const { contacts } = useSelector((state) => state.contact);
  const { allCourses: courses } = useSelector((state) => state.courses);
  const { colleges } = useSelector((state) => state.college);
  const { services } = useSelector((state) => state.services);
  const { blogs } = useSelector((state) => state.blog);
  const { galleries } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(getEnquiryCount());
    dispatch(getFollowUps());
    dispatch(getContacts());
    dispatch(getAllCourses());
    dispatch(getColleges());
    dispatch(getServices());
    dispatch(getBlog());
    dispatch(getGalleries());
  }, [dispatch]);

  // Current counts
  const followUpCount = followUps?.length || 0;
  const contactsCount = contacts?.length || 0;
  const coursesCount = courses?.length || 0;
  const collegesCount = colleges?.length || 0;
  const servicesCount = services?.length || 0;
  const blogsCount = blogs?.length || '-';
  const galleriesCount = galleries?.length || '-';

  // Previous mock data
  const previousData = {
    enquiries: 1000,
    followUps: 800,
    contacts: 400,
    courses: 25,
    colleges: 1,
    services: 5,
    blogs: 5,
    galleries: 5
  };

  // Helper to compute color and change %
  const getMetric = (current, previous) => {
    const percent = previous ? ((current - previous) / previous) * 100 : 0;
    const isLoss = percent < 0;
    const color = percent > 0 ? 'success' : percent < 0 ? 'error' : 'primary';
    return { percent: parseFloat(percent.toFixed(2)), isLoss, color };
  };

  // Metrics data
  const metrics = [
    {
      title: 'Enquiries',
      count: enquiryCount.toString(),
      icon: Assignment,
      ...getMetric(enquiryCount, previousData.enquiries)
    },
    {
      title: 'Follow Ups',
      count: followUpCount.toString(),
      icon: QuestionAnswer,
      ...getMetric(followUpCount, previousData.followUps)
    },
    {
      title: 'Contacts',
      count: contactsCount.toString(),
      icon: Contacts,
      ...getMetric(contactsCount, previousData.contacts)
    },
    {
      title: 'Courses',
      count: coursesCount.toString(),
      icon: School,
      ...getMetric(coursesCount, previousData.courses)
    },
    {
      title: 'Colleges',
      count: collegesCount.toString(),
      icon: Business,
      ...getMetric(collegesCount, previousData.colleges)
    },
    {
      title: 'Services',
      count: servicesCount.toString(),
      icon: SpaceDashboard,
      // ...getMetric(servicesCount, previousData.services)
    },
    {
      title: 'Blogs',
      count: blogsCount.toString(),
      icon: RssFeed,
      // ...getMetric(blogsCount, previousData.blogs)
    },
    {
      title: 'Gallery',
      count: galleriesCount.toString(),
      icon: Collections,
      // ...getMetric(galleriesCount, previousData.galleries)
    }
  ];

  return (
    <>
      <Grid container spacing={2}>
        {metrics.map((item, index) => (
          <Grid item sm={6} md={4} lg={3} key={index}>
            <AnalyticEcommerce
              title={item.title}
              count={item.count}
              percentage={item.percent}
              isLoss={item.isLoss}
              color={item.color}
              icon={<item.icon />}
            />
          </Grid>
        ))}

      </Grid>
      <Grid container spacing={2} mt={3}>
        <Grid item md={12} lg={12}>
          <OrdersTable />
        </Grid>
      </Grid>
    </>
  );
}
