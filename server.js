const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

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
const usersRouter = require('./routes/api/users');
const notesRouter = require('./routes/api/notes');

app.use('/api/users',usersRouter);
app.use('/api/notes',notesRouter);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// Start up server
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});