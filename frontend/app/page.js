// app/page.js
"use client"; // Enable client-side rendering

import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation'; // Using useSearchParams to access query parameters

const HomePage = () => {
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false); // New state to handle redirecting

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRedirecting(true); // Set redirecting state to true
          window.location.href = '/signIn'; // Redirect using window.location
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Redirecting to Login
      </Typography>
      <Typography variant="h6">
        You will be redirected in {countdown} seconds...
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => window.location.href = '/signIn'} // Immediate redirect on button click
      >
        Go to Login Now
      </Button>
      {redirecting && <Typography variant="body2" color="textSecondary">Redirecting...</Typography>}
    </Box>
  );
};

export default HomePage;
