const User = require('../models/UserModel');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { uploadSingle, uploadMultiple, destroyUploaded } = require('../utils/cloudinaryUpload');


exports.registerUser = async (req, res, next) => {

    try {

        const imageDetails = await uploadSingle(req.file.path, 'avatar');
        req.body.avatar = imageDetails;
        const user = await User.create(req.body);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create an account'
            })
        }

        sendToken(user, 200, res);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email & password' })
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const passwordMatched = await user.comparePassword(password);

    if (!passwordMatched) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    sendToken(user, 200, res)

}

exports.logoutUser = async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: 'Logged Out'
    })

}

exports.updateUser = async (req, res, next) => {

    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contact_number: req.body.contact_number
    }

    const user = await User.findById(req.user.id)

    if (req.file) {
        if (user.avatar) {
            destroyUploaded(user.avatar.public_id)
        }
        const imageDetails = await uploadSingle(req.file.path, 'avatar');
        newUserData.avatar = imageDetails
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    })

    if (!user) {
        return res.status(401).json({ message: "User not updated" });
    }

    res.status(200).json({
        success: true,
        user: updatedUser
    })

}

exports.getUserProfile = async (req, res, next) => {

    try {
        const { id } = req.params

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `Error occured, contact the developer for inquiries`,
        })
    }

}

exports.forgotUserPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ error: 'User not found with this email' })
    }
    // Get reset token
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${process.env.REACT_PUBLIC_URL}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow: <a href="${resetUrl}">${resetUrl}</a> If you have not requested this email, then ignore it.`
    try {
        await sendEmail({
            email: user.email,
            subject: `${process.env.APP_NAME} Password Recovery`,
            message,
        })

        return res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return res.status(500).json({ error: error.message })
        // return next(new ErrorHandler(error.message, 500))
    }
}

exports.resetUserPassword = async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has been expired' })
        // return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Password does not match' })
        // return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
}

exports.updateUserPassword = async (req, res, next) => {

}