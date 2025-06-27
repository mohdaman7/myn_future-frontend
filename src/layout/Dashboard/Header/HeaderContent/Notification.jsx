import { useRef, useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import BellOutlined from '@ant-design/icons/BellOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import Forum from '@mui/icons-material/Forum';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEnquiries,
  updateEnquiry,
  getNewEnquiryCount,
  addNotification,
} from '../../../../pages/container/enquries/slice';
import FormatDate from '../../../../utils/defult/FormatDate';

const avatarSX = { width: 36, height: 36, fontSize: '1rem' };
const actionSX = { mt: '6px', ml: 1, top: 'auto', right: 'auto', alignSelf: 'flex-start', transform: 'none' };

export default function Notification() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newCount, newEnquiries, loading, error } = useSelector((state) => state.enquiries);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Initialize notifications from Redux
  useEffect(() => {
    dispatch(getNewEnquiryCount());
  }, [dispatch]);

  // Update notifications when newEnquiries changes
  useEffect(() => {
    setNotifications(newEnquiries.map(enq => ({
      id: enq.id,
      fName: enq.fName,
      enqNo: enq.enqNo,
      createdAt: enq.createdAt,
      read: false,
    })));
  }, [newEnquiries]);

  // Setup SSE for real-time updates
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5050/api/enquiries/stream');
    eventSource.addEventListener('newEnquiry', (event) => {
      const data = JSON.parse(event.data);
      dispatch(addNotification({
        id: data.id,
        fName: data.fName,
        enqNo: data.enqNo,
        createdAt: data.createdAt,
      }));
    });
    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    dispatch(getNewEnquiryCount());
    setOpen(false);
  };

  const handleNotificationClick = async (id) => {
    try {
      await dispatch(updateEnquiry({ id, data: { status: 'active' } }));
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
      setOpen(false);
      navigate(`/enquiries`);
      dispatch(getEnquiries());
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={(theme) => ({
          color: 'text.primary',
          bgcolor: open ? 'grey.100' : 'transparent',
          ...theme.applyStyles('dark', { bgcolor: open ? 'background.default' : 'transparent' }),
        })}
        aria-label="open notifications"
        ref={anchorRef}
        aria-controls={open ? 'notifications-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={newCount} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [downMD ? -5 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={(theme) => ({ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 285, maxWidth: { xs: 285, md: 420 } })}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notifications"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    newCount > 0 && (
                      <Tooltip title="Mark as all read">
                        <IconButton color="success" size="small" onClick={handleMarkAllRead}>
                          <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        px: 2,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' },
                      },
                    }}
                  >
                    {notifications.length === 0 ? (
                      <ListItem>
                        <ListItemText primary="No new notifications" />
                      </ListItem>
                    ) : (
                      notifications.map((notif) => (
                        <ListItem
                          key={notif.id}
                          component={ListItemButton}
                          divider
                          selected={!notif.read}
                          onClick={() => handleNotificationClick(notif.id)}
                          secondaryAction={
                            <Typography variant="caption" noWrap>
                              {FormatDate(notif.createdAt)}
                            </Typography>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                              <Forum />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="h6">
                                It's{' '}
                                <Typography component="span" variant="subtitle1">
                                  {notif.fName}'s
                                </Typography>{' '}
                                Enquiries Notification
                              </Typography>
                            }
                            secondary={FormatDate(notif.createdAt)}
                          />
                        </ListItem>
                      ))
                    )}
                    <ListItemButton
                      sx={{ textAlign: 'center', py: `${12}px !important` }}
                      onClick={() => {
                        setOpen(false);
                        navigate('/enquiries');
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}