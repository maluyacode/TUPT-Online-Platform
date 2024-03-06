const User = require('../models/UserModel');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { uploadSingle, uploadMultiple, destroyUploaded } = require('../utils/cloudinaryUpload');
const { sendCodeToEmail, sendCodeToContact, verifyEmailAndContactCode, verifyAccount } = require('../utils/verification');
const sendSMS = require('../utils/sendSMS');

exports.totalUsers = async (req, res, next) => {

    try {

        const users = await User.find()

        const totalUsers = users.length;
        const totalStudents = users.filter(user => user.role === 'student').length
        const totalParents = users.filter(user => user.role === 'parent').length
        const totalTeachers = users.filter(user => user.role === 'teacher').length

        res.json({
            success: true,
            message: 'Successfully Notify',
            totalUsers: totalUsers,
            totalParents: totalParents,
            totalStudents: totalStudents,
            totalTeachers: totalTeachers,
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }
}