"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import SweetAlert from "sweetalert2"; 
import FileDropZone from "./fileDropZone";
import { validationSchema } from "../utils/validationSchema"; 
import { Box, Button, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Divider } from "@mui/material";
import { FaCar, FaSignOutAlt } from "react-icons/fa"; // Import car and logout icons
import apiRequest from "../utils/api";

const CarForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resetUpload, setResetUpload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (!token || token === undefined) {
      // Redirect to sign-in page if token does not exist
      window.location.href = "/signIn";
    }
  }, []);
 
  const formik = useFormik({
    initialValues: {
      carName: "",
      carModel: "",
      phoneNumber: "",
      city: "",
      price: "", // Add price here
      numberOfCopies: 1, // Default to 1
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      // Append form values to FormData
      formData.append('name', values.carName);
      formData.append('model', values.carModel);
      formData.append('price', values.price); // Ensure you have this value in your form
      formData.append('phone', values.phoneNumber);
      formData.append('city', values.city);
      
      // Append files to FormData
      uploadedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const token = window.localStorage.getItem('idToken'); // Adjust the key as necessary
      if(await apiRequest('/car-details', 'POST', formData, token)){
        // Reset form fields
        formik.resetForm();
        setUploadedFiles([]);
        setResetUpload(true); // Trigger reset for FileDropZone
        SweetAlert.fire("Success!", "Your car details have been added.", "success");
      }
    },
  });
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleNumberOfCopiesChange = (event) => {
    const numberOfCopies = event.target.value;
    formik.setFieldValue("numberOfCopies", numberOfCopies);
    setUploadedFiles([]); // Clear previous uploads
    setResetUpload(true); // Trigger reset for FileDropZone
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    formik.setFieldValue("city", city);
    formik.setFieldTouched("city", true); // Mark the field as touched to trigger validation
  };

  const handleLogout = () => {
    localStorage.removeItem("idToken"); // Remove token from local storage
    window.location.href = "/signIn"; // Redirect to sign-in page
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          <FaCar style={{ marginRight: '8px' }} /> Car Details
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<FaSignOutAlt />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Car Name"
        id="carName"
        {...formik.getFieldProps("carName")}
        error={formik.touched.carName && Boolean(formik.errors.carName)}
        helperText={formik.touched.carName && formik.errors.carName}
        margin="normal"
      />

      <Divider sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Car Model"
        id="carModel"
        {...formik.getFieldProps("carModel")}
        error={formik.touched.carModel && Boolean(formik.errors.carModel)}
        helperText={formik.touched.carModel && formik.errors.carModel}
        margin="normal"
      />

      <Divider sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Price"
        id="price"
        type="number"
        {...formik.getFieldProps("price")}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        margin="normal"
      />
      <Divider sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Phone Number"
        id="phoneNumber"
        {...formik.getFieldProps("phoneNumber")}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        margin="normal"
      />

      <Divider sx={{ mb: 2 }} />

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">City</FormLabel>
        <RadioGroup row value={formik.values.city} onChange={handleCityChange}>
          <FormControlLabel value="Lahore" control={<Radio />} label="Lahore" />
          <FormControlLabel value="Karachi" control={<Radio />} label="Karachi" />
          <FormControlLabel value="Islamabad" control={<Radio />} label="Islamabad" />
        </RadioGroup>
        {formik.touched.city && formik.errors.city ? (
          <Typography color="error" variant="body2">{formik.errors.city}</Typography>
        ) : null}
      </FormControl>

      <Divider sx={{ mb: 2 }} />

      <TextField
        fullWidth
        label="Number of Copies"
        id="numberOfCopies"
        type="number"
        inputProps={{ min: 1, max: 3 }}
        {...formik.getFieldProps("numberOfCopies")}
        onChange={(event) => {
          handleNumberOfCopiesChange(event);
          formik.handleChange(event);
        }}
        error={formik.touched.numberOfCopies && Boolean(formik.errors.numberOfCopies)}
        helperText={formik.touched.numberOfCopies && formik.errors.numberOfCopies}
        margin="normal"
      />

      <Divider sx={{ mb: 2 }} />

      <FileDropZone
        maxFiles={formik.values.numberOfCopies}
        onFileUpload={handleFileUpload}
        resetUpload={resetUpload} // Reset state when number of copies changes
      />
      
      <Divider sx={{ mb: 2 }} />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CarForm;
