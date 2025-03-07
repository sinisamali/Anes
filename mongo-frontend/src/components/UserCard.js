import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={user.image_urls[0]} // Prva slika iz niza
        alt={user.name}
      />
      <CardContent>
        <Typography variant="h6">ID: {user._id}</Typography>
        <Typography variant="body2">
          Telefon: {user.phone}
        </Typography>
        <Typography variant="body2">
          Grad: {user.city}, {user.country}
        </Typography>
        <Typography variant="body2">{user.about_me}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
