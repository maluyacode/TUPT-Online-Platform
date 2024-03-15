const User = require('../models/UserModel');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { uploadSingle, uploadMultiple, destroyUploaded } = require('../utils/cloudinaryUpload');
const { sendCodeToEmail, sendCodeToContact, verifyEmailAndContactCode, verifyAccount } = require('../utils/verification');
const sendSMS = require('../utils/sendSMS');

exports.registerUser = async (req, res, next) => {

    if (req.body.whosCreating === 'admin') {
        next()

    } else {
        console.log("asdasd")
        try {

            const user = await User.create(req.body);
            const newUser = await User.findById(user._id);

            const emailCode = await newUser.getEmailCodeVerification()
            const contactCode = await newUser.getContactCodeVerification()

            newUser.save({ validateBeforeSave: false });
            sendCodeToEmail(newUser, emailCode);
            sendCodeToContact(newUser, contactCode)

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
}

exports.regsteredByAdmin = async (req, res, next) => {
    // console.log(JSON.parse(req.body.iCareFor))

    try {

        if (req.body.role === 'parent') {
            console.log(req.body.iCareFor)
            req.body.iCareFor = JSON.parse(req.body.iCareFor).map(value => {
                return {
                    user: value,
                    isAccepted: true,
                }
            })
        }

        req.body.isContactVerified = true
        req.body.isEmailVerified = true

        if (req.file) {
            const imageDetails = await uploadSingle(req.file.path, 'avatar');
            req.body.avatar = imageDetails
        }

        const user = await User.create(req.body);

        return res.status(200).json({
            success: true,
            message: 'User successfully created',
            user: user
        })

    } catch (err) {

        console.log(err)
        res.status(500).json({
            success: false
        })

    }

}

exports.verifyCode = async (req, res, next) => {

    const { contactCode, emailCode } = req.body;

    const user = await User.findById(req.user._id);

    const isVerified = verifyEmailAndContactCode(user, req, res, next);

    if (!isVerified) {
        return;
    }

    const verifiedUser = await verifyAccount(user)
    sendToken(verifiedUser, 200, res);

}

exports.reSendCode = async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Account does not exist'
        })
    }

    if (!user.isEmailVerified) {
        const emailCode = await user.getEmailCodeVerification()
        sendCodeToEmail(user, emailCode);
    }

    if (!user.isContactVerified) {
        const contactCode = await user.getContactCodeVerification()
        sendCodeToContact(user, contactCode)
    }

    user.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: "We send you the verification codes"
    })
}

exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    let checkUser = await User.findOne({ email })

    if (checkUser?.deletedAt) {
        return res.status(400).json({
            message: 'Account does not exist',
        })
    }

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email & password' })
    }

    let user = await User.findOne({ email }).select('+password');


    if (!user) {
        return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const passwordMatched = await user.comparePassword(password);

    if (!passwordMatched) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }

    user = await User.findOne(user._id);

    sendToken(user, 200, res)

}

exports.logoutUser = async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.cookie('user', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: 'Logged Out',
        success: true,
    })

}

exports.updateUser = async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (req.body.role === 'parent') {
        req.body.iCareFor = JSON.parse(req.body.iCareFor).map(value => {
            return {
                user: value,
            }
        })
    } else {
        req.body.iCareFor = []
    }

    if (req.file) {
        if (user.avatar) {
            destroyUploaded(user.avatar.public_id)
        }
        const imageDetails = await uploadSingle(req.file.path, 'avatar');
        req.body.avatar = imageDetails
    }

    if (req.body.birthdate == 'Invalid Date') {
        req.body.birthdate = null
    }

    if (req.body.contact_number !== user.contact_number) {
        const contactCode = await user.getContactCodeVerification()
        sendCodeToContact(user, contactCode)
    }

    if (req.body.email !== user.email) {
        const emailCode = await user.getEmailCodeVerification()
        sendCodeToEmail(user, emailCode);
    }

    user.save({ validateBeforeSave: false });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!updatedUser) {
        return res.status(401).json({ message: "User not updated" });
    }

    if (req.body.whosEditing === 'admin') {
        return res.status(200).json({
            success: true,
            message: 'User updated successfully'
        })
    }

    sendToken(updatedUser, 200, res, 'Profile successfully updated');

    // res.status(200).json({
    //     success: true,
    //     user: updatedUser
    // })
}

exports.getUserProfile = async (req, res, next) => {

    try {
        const { id } = req.params

        const user = await User.findById(id);

        const parents = await User.find({
            role: 'parent',
            iCareFor: { $exists: true, $ne: [] }
        })

        const connectedParents = parents.filter(parent =>
            parent.iCareFor.some(iCareForItem => iCareForItem.user.equals(user._id) && iCareForItem.isAccepted === true)
        );

        const pendingParents = parents.filter(parent =>
            parent.iCareFor.some(iCareForItem => iCareForItem.user.equals(user._id) && iCareForItem.isAccepted === false)
        )

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        return res.status(200).json({
            success: true,
            user,
            connectedParents: connectedParents,
            pendingParents: pendingParents,
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
        return res.status(404).json({ message: 'User not found with this email' })
    }
    // Get reset token
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${process.env.REACT_PUBLIC_URL}/change-password/${resetToken}`;
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
        return res.status(500).json({ message: error.message })
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

    return res.status(200).json({
        message: 'Password successfully changed',
        success: true,
    })
    // sendToken(user, 200, res);
}

exports.updateUserPassword = async (req, res, next) => {

    const user = await User.findById(req.user.id).select('password');
    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return res.status(400).json({ message: 'Old password is incorrect' })
    }
    user.password = req.body.password;
    await user.save();

    const updateUser = await User.findById(user._id);

    sendToken(updateUser, 200, res, 'Password successfully changed')
}

exports.getAllUsers = async (req, res, next) => {

    const userFilter = {
        _id: { $ne: req.user._id } // Exclude the current user
    };

    if (req.query.role) {
        userFilter.role = req.query.role; // Filter by role if provided
    }

    try {

        const users = await User.find(userFilter);

        res.status(200).json({
            success: true,
            users: users,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

exports.getUsersFreeAccess = async (req, res, next) => {

    const userFilter = {}

    if (req.query.role) {
        userFilter.role = req.query.role; // Filter by role if provided
    }

    try {

        const users = await User.find(userFilter);

        res.status(200).json({
            success: true,
            users: users,
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }

}

exports.deleteUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);
        if (req.query.action === 'restore') {
            user.deletedAt = null;
        } else {
            user.deletedAt = new Date();
        }
        user.save();

        res.status(200).json({
            success: true,
            message: 'User successfully deleted'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

exports.emailUsers = async (req, res, nex) => {
    try {
        console.log(req.body.body)
        const users = JSON.parse(req.body.users);

        for (let i in users) {
            await sendEmail({
                email: users[i].email,
                subject: req.body.subject,
                message: req.body.body,
                attachments: req.files.attachments,
            })
        }

        res.status(200).json({
            success: true,
            message: 'Email successfully delivered'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

exports.sendSMStoUsers = async (req, res, next) => {
    try {

        const users = JSON.parse(req.body.users);

        for (let i in users) {
            setTimeout(async () => {
                await sendSMS({
                    message: req.body.message,
                    phone: users[i].phone,
                })
            }, 1000)
        }

        res.status(200).json({
            success: true,
            message: 'SMS sent'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

exports.acceptParentRequest = async (req, res, next) => {

    try {

        const parent = await User.findOne({
            _id: req.params.id,
            role: 'parent',
        })

        const result = parent.iCareFor.find(student => student.user == req.user.id).isAccepted = true;
        parent.save();
        return res.status(200).json({
            success: true,
            message: `You accepted ${parent.firstname} ${parent.lastname} as your parent/guardian`,
            parent: parent
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `Error occured, contact the developer for inquiries`,
        })
    }

}

exports.rejectParentRequest = async (req, res, next) => {

    try {

        const parent = await User.findOne({
            _id: req.params.id,
            role: 'parent',
        })

        const result = parent.iCareFor.filter(student => student.user != req.user.id)
        parent.iCareFor = result;
        parent.save();
        return res.status(200).json({
            success: true,
            message: `You rejected ${parent.firstname} ${parent.lastname} as your parent/guardian`,
            parent: parent
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: `Error occured, contact the developer for inquiries`,
        })
    }

} 