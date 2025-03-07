import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, Grid, Avatar } from '@mui/material';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams(); // Dobijanje ID-ja iz URL-a
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch korisnika prema ID-ju
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user) {
    return <Typography>Korisnik nije pronađen.</Typography>;
  }

  const avatarUrl = user.image_urls && user.image_urls.length > 0 ? user.image_urls[0] : '';

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Avatar
          src={avatarUrl}
          alt={user.name}
          sx={{ width: 64, height: 64, marginRight: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
      </Box>
      <Typography variant="body1">Phone: {user.phone || 'N/A'}</Typography>
      <Typography variant="body1">City: {user.city || 'N/A'}</Typography>
      <Typography variant="body1">Country: {user.country || 'N/A'}</Typography>
      <Typography variant="body1">Gender: {user.gender || 'N/A'}</Typography>
      <Typography variant="body1">About: {user.about_me || 'N/A'}</Typography>
      <Typography variant="body1">Age: {user.age || 'N/A'}</Typography>
      <Typography variant="body1">Services: {user.services || 'N/A'}</Typography>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Images</Typography>
        <Grid container spacing={2}>
          {user.image_urls && user.image_urls.length > 0 ? (
            user.image_urls.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    width="300"
                    image={image}
                    alt={`Image ${index + 1}`}
                    sx={{ objectFit: 'contain' }} // Slika pokriva celu karticu
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No images available</Typography>
          )}
        </Grid>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Videos</Typography>
        <Grid container spacing={2}>
          {user.video_urls && user.video_urls.length > 0 ? (
            user.video_urls.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="video"
                    controls
                    height="200"
                    src={video}
                    alt={`Video ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No videos available</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetails;
