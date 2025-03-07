import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, Pagination } from '@mui/material';
import axios from 'axios';

const VideoPage = () => {
  const [videoUsers, setVideoUsers] = useState([]); // State for video users
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const fetchVideos = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/videos?page=${page}&limit=50`); // Fetch 50 videos per page
      setVideoUsers(response.data.videos || []);
      setTotalPages(response.data.totalPages || 1); // Set total pages from API response
    } catch (error) {
      console.error('Error fetching video users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page); // Fetch videos when the page changes
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value); // Set the selected page
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Video Page
      </Typography>
      <Grid container spacing={2}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          videoUsers.map((user) => (
            <Grid item xs={12} key={user._id}>
              <Typography variant="h6" gutterBottom>
                User ID: {user._id}
              </Typography>
              <Grid container spacing={2}>
                {user.video_urls.map((url, index) => (
                  <Grid item key={`${user._id}_${index}`} xs={12} sm={6} md={4}>
                    <Card>
                      <CardMedia component="video" controls src={url} height="200" />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default VideoPage;
