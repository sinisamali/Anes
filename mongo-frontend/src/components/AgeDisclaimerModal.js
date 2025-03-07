import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Styled components for custom styling
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    padding: theme.spacing(2),
    maxWidth: 400,
    width: '100%'
  }
}));

const StyledDialogActions = styled(DialogActions)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: '16px',
  padding: '16px'
});

const AgeDisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAccept = () => {
    setIsOpen(false);
    localStorage.setItem('ageVerified', 'true');
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    if (isVerified) {
      setIsOpen(false);
    }
  }, []);

  return (
    <StyledDialog
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          setIsOpen(false);
        }
      }}
      aria-labelledby="age-verification-dialog"
      aria-describedby="age-verification-description"
    >
      <DialogTitle 
        id="age-verification-dialog"
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem'
        }}
      >
        Age Verification Required
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          id="age-verification-description"
          sx={{ 
            textAlign: 'center',
            marginY: 2
          }}
        >
          You must be 18 years or older to access this website.
          Please confirm your age to continue.
        </DialogContentText>
      </DialogContent>
      <StyledDialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAccept}
          sx={{ 
            minWidth: '140px',
            textTransform: 'none'
          }}
        >
          I am 18 or older
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDecline}
          sx={{ 
            minWidth: '140px',
            textTransform: 'none'
          }}
        >
          I am under 18
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default AgeDisclaimerModal;