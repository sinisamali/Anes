import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  Card,
  CardMedia,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

const TopVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Dodato stanje za učitavanje
  const [open, setOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    // Fetch videos from backend
    axios
      .get('http://localhost:5000/videos/?page=1')
      .then((response) => {
        setVideos(response.data.slice(0, 10)); // Get only the first 10 videos
        setLoading(false); // Učitavanje završeno
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        setLoading(false); // Učitavanje završeno čak i u slučaju greške
      });
  }, []);

  const handleOpen = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentVideo('');
  };

  return (
    <div>
      {loading ? ( // Provera da li je učitavanje u toku
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
          <Typography sx={{ marginLeft: 2 }}>Loading videos...</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onClick={() => handleOpen(video.video_urls[0])}
              >
                <CardMedia
                  component="video"
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                  src={video.video_urls[0]} // URL lokalnog video fajla
                  alt={video.name}
                  controls={false} // Samo thumbnail, video neće biti pušten ovde
                />
                {/* Play button na sredini */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      },
                    }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dijalog za prikaz videa */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent sx={{ position: 'relative', padding: 0 }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <ReactPlayer url={currentVideo} playing controls width="100%" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopVideos;
