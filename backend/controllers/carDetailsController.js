const CarDetails = require('../models/CarDetails');

const addCarDetails = async (req, res) => {
    const { name, model, price, phone, city } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];
  
    const carDetails = new CarDetails({
      name,
      model,
      price,
      phone,
      city,
      images,
      userId: req?.user?._id, // Ensure userId is being decrypted properly in your middleware
    });
  
    console.log({ carDetails });
  
    try {
      await carDetails.save();
      res.status(201).json({ message: 'Car details added successfully' });
    } catch (error) {
      console.log({ error });
      res.status(400).json({ message: 'Failed to add car details' });
    }
  };  

module.exports = { addCarDetails };
