const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const configPath = path.join(__dirname, './config/config.env');
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const { get } = require('http');

dotenv.config({ path: configPath });

const getIp = async () => {
    const res = await axios.get('https://api.ipify.org?format=json');
    console.log(`Your IP address is ${res.data.ip}`);
}

const connectAtlas = asyncHandler(
    async () => {
        await getIp();
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    }
)

module.exports = connectAtlas;