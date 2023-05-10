const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const configPath = path.join(__dirname, './config/config.env');


dotenv.config({ path: configPath });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

