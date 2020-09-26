const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Connection to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to MongoDB database established successfully!");
});

// Routes
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

app.use('/users',usersRouter);
app.use('/notes',notesRouter);


// Start up server
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});