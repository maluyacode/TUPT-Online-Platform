const generateCode = require('../utils/generateCode')
const sendEmail = require('../utils/sendEmail')

exports.sendCodeToEmail = (user, code) => {
    sendEmail({
        email: user.email,
        subject: 'Verification Code',
        message: `This is your verification code ${code}. This will be valid in 5 minutes`
    })
}

exports.sendCodeToContact = async (user, code) => {
    const message = {
        to: user.contact_number,
        message: `This is your code ${code}, this will be valid within 5 minutes`,
    }
    const response = await fetch(process.env.TRACCAR_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.TRACCAR_AUTH
        },
        body: JSON.stringify(message)
    })
}

exports.verifyEmailAndContactCode = (user, req, res, next) => {

    const { contactCode, emailCode } = req.body;

    if (!user.isEmailVerified) {

        if (user.emailCodeVerification !== emailCode && user.contactCodeVerification !== contactCode) {
            res.status(406).json({
                success: false,
                message: `Contact number verification code and email verification code doesn't match`
            })
            return false
        }

        if (user.emailCodeVerification !== emailCode) {
            res.status(406).json({
                success: false,
                message: `Email verification code doesn't match`
            })
            return false
        }
    }

    if (!user.isContactVerified) {

        if (user.contactCodeVerification !== contactCode) {
            res.status(406).json({
                success: false,
                message: `Contact number verification code doesn't match`
            })
            return false
        }

        if (user.emailCodeExpire < Date.now() && user.contactCodeExpire < Date.now()) {
            res.status(406).json({
                success: false,
                message: 'Verfication codes are expired, please resend code'
            })
            return false
        }
    }

    return true
}

exports.verifyAccount = async user => {
    user.isContactVerified = true
    user.isEmailVerified = true
    user.contactCodeExpire = null
    user.contactCodeVerification = null
    user.emailCodeExpire = null
    user.emailCodeVerification = null
    user.save();
    return user;
}