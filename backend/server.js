const express = require('express');
const colors = require('colors');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const configPath = path.join(__dirname, './config/config.env');
const goalRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectAtlas = require('./config/db');

dotenv.config({ path: configPath });
const PORT = process.env.PORT || 5000;

// app.set('strict routing', false);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

connectAtlas();

app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


