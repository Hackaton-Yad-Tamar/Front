// CardList.js
import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Stack,
  Box
} from '@mui/material';
import './CardList.css';

const Card = ({ title, subtitle, description, location }) => {
  return (
    <MuiCard 
      sx={{ 
    
        width: '40vw',    // Mobile
        height: '20vh',
        border: '0.052vw solid #002F42',
        borderRadius: '0.5vw',
        boxShadow: '0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25)',
        position: 'relative',
        backgroundColor: '#FFFFFF'
      }}
    >
      <CardContent>
      <Typography 
          variant="h4"
          sx={{
            position: 'absolute',
            left: { xs: '1vw', sm: '1.04vw' },
            bottom: { xs: '1vh', sm: '1.85vh' },
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 400,
            fontSize:'1.4vw',
            lineHeight: { xs: '5vw', sm: '3.5vw', md: '2.45vw' },
            color: '#002F42',
            textAlign: 'left',
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {location}
        </Typography>
        <Box 
          sx={{
            position: 'absolute',
            right: { xs: '1.5vw', sm: '3.26vw' },
            top: '1vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            width: {
              xs: 'calc(100% - 1.5vw - 1vw)',
              sm: 'calc(100% - 3.26vw - 1.04vw)'
            },
          }}
        >
          <Typography 
            variant="h4"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 700,
              fontSize: '1.4vw',
              lineHeight: { 
                xs: '5vw', 
                sm: '3.5vw',
                md: '2.45vw' 
              },
              color: '#002F42',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </Typography>

          <Typography 
            variant="h4"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 400,
              fontSize: '1.4vw',
              lineHeight: { xs: '5vw', sm: '3.5vw', md: '2.45vw' },
              color: '#002F42',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {subtitle}
          </Typography>

          <Typography 
            variant="h4"
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontWeight: 400,
              fontSize: '1.4vw',
              lineHeight: { xs: '5vw', sm: '3.5vw', md: '2.45vw' },
              color: '#002F42',
              textAlign: 'center',
              whiteSpace: { xs: 'normal', sm: 'nowrap' }, // Allow wrapping on mobile
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {description}
          </Typography>
        </Box>

        
      </CardContent>
    </MuiCard>
  );
};

const CardList = ({ cardsData }) => {
  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} // Stack vertically on mobile
      spacing={{ xs: 1, sm: 2 }}
      useFlexGap 
      sx={{ 
        p: { xs: '2vw', sm: '1.04vw' },
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: { xs: 'center', sm: 'flex-start' }
      }}
    >
      {cardsData.map((card, index) => (
        <Card 
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          location={card.location}
        />
      ))}
    </Stack>
  );
};

export default CardList;