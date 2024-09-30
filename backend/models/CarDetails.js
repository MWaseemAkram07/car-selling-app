const mongoose = require('mongoose');

const carDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  images: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const CarDetails = mongoose.model('CarDetails', carDetailsSchema);
module.exports = CarDetails;
