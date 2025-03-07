import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Pagination, Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const AllUserPages = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;
  const usersPerPage = 40;

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users?page=${currentPage}&limit=${usersPerPage}`);
      const data = response.data;
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    navigate(`/users?page=${value}`);
  };

  const handleUserClick = (id) => {
    if (!id) {
      console.error("ID is not defined:", id);
      return;
    }
    navigate(`/user/${id}`);
  };

  return (
    <Container sx={{ maxWidth: '90% !important', marginTop: 4, marginBottom: 4 }}>
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid
                item
                xs={6} // 2 cards per row on extra-small screens (phones)
                sm={4} // 3 cards per row on small screens (tablets)
                md={3} // 4 cards per row on medium screens
                lg={2.4} // 5 cards per row on large screens
                key={user.id || user._id}
              >
                <Card
                  onClick={() => handleUserClick(user.id || user._id)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    border: '3px solid rgba(255, 215, 0, 0.7)', // Semi-transparent golden border
                    overflow: 'hidden',
                    position: 'relative',
                    aspectRatio: '3 / 4', // Ensures the card has a 3:4 aspect ratio
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      user.image_urls && user.image_urls.length > 0
                        ? user.image_urls[0]
                        : 'https://via.placeholder.com/200'
                    }
                    alt={user.name || 'User'}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover', // Ensures the image covers the card completely
                      objectPosition: 'center', // Centers the image
                    }}
                  />
                  <CardContent
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                      color: '#fff',
                      padding: '8px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      title={user.name || 'Unknown'} // Tooltip with the full text
                      sx={{
                        fontWeight: 'bold',
                        whiteSpace: 'normal', // Allow text to wrap
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limit to 2 lines
                        WebkitBoxOrient: 'vertical',
                        fontSize: {
                          xs: '0.8rem',
                          sm: '1rem',
                          md: '1.2rem',
                          lg: '1.4rem',
                        },
                      }}
                    >
                      {user.name || 'Unknown'}
                    </Typography>

                    {/* Only render city if it's not null, undefined, or empty */}
                    {user.city && user.city !== 'null' && (
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.8,
                          whiteSpace: 'normal', // Allow text to wrap
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: {
                            xs: '0.6rem',
                            sm: '0.8rem',
                            md: '1rem',
                            lg: '1.1rem',
                          },
                        }}
                      >
                        {user.city} {/* Display the city name only */}
                      </Typography>
                    )}
                  </CardContent>



                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
           <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default AllUserPages;


 