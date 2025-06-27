import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        backgroundColor: 'rgba(216, 216, 216, 0.9)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={24}
          sx={{
            maxWidth: 600,
            margin: 'auto',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
              Submission Successful
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
              Your enquiry has been submitted successfully. We will get back to you soon!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/EnquiryForm')}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                borderRadius: '25px',
                px: 4,
                py: 1,
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  boxShadow: '0 12px 35px rgba(33, 150, 243, 0.4)',
                },
              }}
            >
              Submit Another Enquiry
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ThankYou;