const User = require('../models/UserModel');
const cloudinary = require('cloudinary');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
// const ImageCloudinary = require('../utils/cloudinaryUpload');

exports.registerUser = async (req, res, next) => {
    res.json({
        success: true,
        message: "Register successfully (in controller)"
    })
}

exports.loginUser = async (req, res, next) => {

}

exports.logoutUser = async (req, res, next) => {

}

exports.updateUser = async (req, res, next) => {

}

exports.getUserProfile = async (req, res, next) => {

}

exports.forgotUserPassword = async (req, res, next) => {

}

exports.resetUserPassword = async (req, res, next) => {

}

exports.updateUserPassword = async (req, res, next) => {

}