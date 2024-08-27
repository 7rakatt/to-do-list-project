const express = require('express')
const mongoose = require('mongoose')
const app = express();
app.use(express.json());
const tasksRouter = require('./routes/task.rout');
require("dotenv").config();
const url = process.env.MONGO_URL;
const port = process.env.PORT;
mongoose.connect(url).then(() => {
    console.log('connected success to the server');
});

app.use(tasksRouter);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})