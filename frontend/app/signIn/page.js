"use client";

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import apiRequest from '../utils/api';

const SignIn = () => {
  const [error, setError] = useState(null);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values) => {
      // Call the submission logic
      const result = await apiRequest('/sign-in', 'POST', { email:values.email, password: values.password });
      console.log(`result--`, result)

      if (result.success) {
        window.localStorage.setItem("idToken", result.token);
        Swal.fire({
          title: 'Success!',
          text: result.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
            window.location.href = '/carDetails'; // Redirect using window.location
        });
      } else {
        setError(result.message);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign in to your CarSellPoint
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email address"
              type="email"
              required
              autoComplete="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />
          </Box>

          <Box marginBottom={2}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
            />
          </Box>

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
