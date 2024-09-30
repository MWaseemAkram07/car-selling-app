const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const carDetailsRoutes = require('./routes/carDetails');
const errorHandler = require('./errorHandler');
const cors = require('cors');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Authorization'],
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', carDetailsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
