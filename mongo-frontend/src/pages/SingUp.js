import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Card,
  Stack,
  Link,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const SignUp = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const validateInputs = () => {
    // Validation logic here...
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Box>
      <CssBaseline />
      <Stack
        spacing={2}
        sx={{
          maxWidth: 400,
          margin: 'auto',
          marginTop: 8,
          padding: 2,
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <TextField
              id="name"
              name="name"
              placeholder="John Doe"
              error={nameError}
              helperText={nameErrorMessage}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <TextField
              id="email"
              name="email"
              placeholder="example@email.com"
              error={emailError}
              helperText={emailErrorMessage}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              error={passwordError}
              helperText={passwordErrorMessage}
              required
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I agree to receive updates via email."
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>OR</Typography>
        </Divider>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => alert('Sign up with Google')}
        >
          Sign Up with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => alert('Sign up with Facebook')}
        >
          Sign Up with Facebook
        </Button>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/sign-in" variant="body2">
            Sign In
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignUp;
