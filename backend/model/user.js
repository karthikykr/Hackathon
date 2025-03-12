const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    avatar: {
        type: {
            filename: String,
            url: String,
        },
        default: {
            filename: 'India Tour/default_avatar_fbyzfp.jpg',
            url: 'https://res.cloudinary.com/dlds2z087/image/upload/v1669354509/India%20Tour/default_avatar_fbyzfp.jpg',
        },
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Email must be valid'],
        required: [true, 'Email must be valid'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is not valid'],
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'faculty', 'hod', 'exam_department'],
        required: [true, 'Role is required'],
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
});

module.exports = mongoose.model('User', userSchema);
