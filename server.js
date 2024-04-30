const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const carRoutes = require('./routes/carRoutes');

const app = express();
const port = process.env.PORT || 1000;

mongoose.connect('mongodb+srv://ashwinsebastian76:ashwin12345@sit725.jctfcnw.mongodb.net/?retryWrites=true&w=majority&appName=SIT725');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', carRoutes);

let http = require('http').createServer(app);
let io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

http.listen(port, () => {
    console.log("App running on " + port);
});
