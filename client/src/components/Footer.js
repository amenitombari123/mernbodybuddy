import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  // Logout handler function
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <Box mt="80px" bgcolor="#FFF3F4">
      <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
        <img src={Logo} alt="logo" style={{ width: '100px', height: '50px' }} />
      </Stack>

      {/* Logout button in the footer */}
      <div className="text-center py-4">
        <span className='text-gray-500'>Come back later? <button onClick={userLogout} className='text-red-500'>Logout</button></span>
      </div>

      <Typography variant="h5" sx={{ fontSize: { lg: '18px', xs: '10px' } }} mt="41px" textAlign="center" pb="40px"> For any Help you can contact us on BuddyBody15@gmail.com ❤️</Typography>
    </Box>
  );
};

export default Footer;
