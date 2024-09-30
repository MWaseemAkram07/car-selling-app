import axios from "axios";

export const submitCarDetails = async (values, uploadedFiles) => {
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

  // Log the contents of FormData
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  // Get token from local storage
  const token = window.localStorage.getItem('idToken'); // Adjust the key as necessary
  console.log({token})

  try {
    const response = await axios.post('http://localhost:5000/api/car-details', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
    });
    return response.data; // Handle success response
  } catch (error) {
    console.error("Error submitting car details:", error);
    return false; // Return false on error
  }
};
