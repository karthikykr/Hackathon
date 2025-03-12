const express = require('express');
const mongoose = require('mongoose');

const adminRouter = require('./routes/admin');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST,PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/admins', adminRouter);

app.use((err, _req, res, _next) => {
    if (err.name === 'ValidationError') err.statusCode = 422;
    const { statusCode = 500, data = [] } = err;

    if (!err.message) err.message = 'Something went wrong, Try again!';
    res.status(statusCode).json({ message: err.message });
});

app.listen(3000, async () => {
    await mongoose.connect('mongodb://localhost:27017/iadatabase');
    console.log('server listening at port 3000');
});
