require('dotenv').config();
require('./config/dbConfig') 
const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port} `);
});
const userRoute = require('./routes/userRoute');
const newsRoute = require('./routes/newsRoute');
app.use('/api/v1/users/',userRoute);
app.use('/api/v1/news/',newsRoute);
module.exports = app;