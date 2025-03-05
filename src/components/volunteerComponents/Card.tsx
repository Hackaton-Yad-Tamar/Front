import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography, Stack, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import './CardList.css';
import RequestDialog from './requestDialog';

const Card = ({ title, subtitle, description, location, onClick }) => {
  return (
    <MuiCard
      sx={{
        width: '100%', // Mobile
        height: '20vh',
        border: '0.052vw solid #002F42',
        borderRadius: '0.5vw',
        boxShadow: '0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25)',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer', // Add pointer cursor on hover
      }}
      onClick={onClick} // Handle card click
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
            fontSize: '1.4vw',
            lineHeight: { xs: '5vw', sm: '3.5vw', md: '2.45vw' },
            color: '#002F42',
            textAlign: 'left',
            whiteSpace: { xs: 'normal', sm: 'nowrap' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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
              sm: 'calc(100% - 3.26vw - 1.04vw)',
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
                md: '2.45vw',
              },
              color: '#002F42',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
              textOverflow: 'ellipsis',
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
              whiteSpace: { xs: 'normal', sm: 'nowrap' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null); // Reset the selected card
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // Stack vertically on mobile
        spacing={{ xs: 1, sm: 2 }}
        useFlexGap
        sx={{
          p: { xs: '2vw', sm: '1.04vw' },
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: { xs: 'center', sm: 'flex-start' },
           marginBottom:'2vh'
        }}
      >
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.name}
            subtitle={card.emergencyType}
            description={card.severity}
            location={card.location}
            onClick={() => handleCardClick(card)} // Pass the card data to the click handler
          />
        ))}
      </Stack>

      <RequestDialog
        open={openDialog}
        onClose={handleCloseDialog}
        emergency={selectedCard} // Pass the selected card as emergency
      />
    </>
  );
};

export default CardList;
