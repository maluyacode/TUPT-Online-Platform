const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const generateCode = require('../utils/generateCode');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide your first name'],
        maxLength: [30, 'Your first name should not be longer than 30 characters'],
        minLength: [1, 'Your first name must have more than 1 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide your last name'],
        maxLength: [30, 'Your last name should not be longer than 30 characters'],
        minLength: [1, 'Your last name must have more than 1 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    contact_number: {
        type: String,
        required: [true, 'Please provide your contact number'],
        unique: true,
        validate: [validator.isMobilePhone, 'Please enter a valid contact number']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: 'student' // student, parent, teacher, admin
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isContactVerified: {
        type: Boolean,
        default: false
    },
    emailCodeVerification: {
        type: String,
    },
    contactCodeVerification: {
        type: String,
    },

    course: { // student
        type: String,
        default: null
    },
    department: { // if teacher
        type: String,
        default: null
    },
    iCareFor: [{ // if parent
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        isAccepted: {
            type: Boolean,
            default: false
        }
    }],
    birthdate: {
        type: Date,
        default: null
    },
    instagramLink: {
        type: String,
        default: null
    },
    facebookLink: {
        type: String,
        default: null
    },
    houseNo: {
        type: String,
        default: null
    },
    street: {
        type: String,
        default: null
    },
    baranggay: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    emailCodeExpire: Date,
    contactCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    deletedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {

    const data = this.getUpdate();

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    next()

});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.comparePassword = async function (inputtedPassword) {
    return await bcrypt.compare(inputtedPassword, this.password);
}

userSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
}

userSchema.methods.getEmailCodeVerification = async function () {
    const code = generateCode(6);
    this.emailCodeVerification = code.trim();
    this.emailCodeExpire = Date.now() + 5 * 60 * 1000;
    this.isEmailVerified = false
    return code;
}

userSchema.methods.getContactCodeVerification = async function () {
    const code = generateCode(6);
    this.contactCodeVerification = code.trim();
    this.contactCodeExpire = Date.now() + 5 * 60 * 1000;
    this.isContactVerified = false
    return code;
}

module.exports = mongoose.model('User', userSchema)