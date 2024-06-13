const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

// สร้าง schema สำหรับผู้ใช้
const userSchema = new mongoose.Schema({
    studentID: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// ตั้งค่า body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// ตั้งค่าเส้นทางสำหรับการลงทะเบียน
app.post('/register', (req, res) => {
    const newUser = new User({
        studentID: req.body.studentID,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Successfully registered!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});