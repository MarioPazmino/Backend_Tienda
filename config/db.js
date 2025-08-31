const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error conectando a MongoDB Atlas:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
