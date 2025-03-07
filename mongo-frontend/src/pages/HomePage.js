import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import Slider from 'react-slick'; // Slick carousel
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/featured-cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ mt: 4, mx: 'auto', width: '90%' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Featured Cards
      </Typography>
      <Slider {...sliderSettings}>
        {cards.map((card, index) => (
          <Card key={index} sx={{ margin: '0 10px', borderRadius: '16px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="200"
              image={card.imageUrl || 'https://via.placeholder.com/300x200'}
              alt={card.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default HomePage;
