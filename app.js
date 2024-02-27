const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs')

const app = express();

var streamdata = fs.readFileSync('D:/Project/Bharat_intern_1/public/index.html','utf-8')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))


mongoose.connect('mongodb+srv://Admin:sZyTYyK6c5uQhVJR@cluster0.gnd8jqi.mongodb.net/internship?retryWrites=true&w=majority&appName=Cluster0')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDB');
});

const registrationSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const Registration = mongoose.model('Registration', registrationSchema);


app.get('/',(req,res)=>{
    res.end(streamdata)
})

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const newRegistration = new Registration({
        username,
        email,
        password
    });

    newRegistration.save().then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
