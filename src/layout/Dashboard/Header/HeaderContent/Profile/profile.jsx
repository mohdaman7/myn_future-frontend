import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Grid, 
  Divider,
  // Button,
  Container
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    
    if (adminUser?.success && adminUser?.user) {
      setUserData(adminUser.user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!userData) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">User Profile</Typography>
          {/* <Button 
            variant="contained" 
            startIcon={<EditIcon />}
            onClick={() => navigate('/profile/edit')}
          >
            Edit Profile
          </Button> */}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={userData.image}
                alt={`${userData.fname} ${userData.lname}`}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Typography variant="h5">{`${userData.fname} ${userData.lname}`}</Typography>
              <Typography color="text.secondary">{userData.userType}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>First Name:</strong> {userData.fname}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Last Name:</strong> {userData.lname}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Mobile:</strong> {userData.mobile}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1"><strong>Status:</strong> {userData.status}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;