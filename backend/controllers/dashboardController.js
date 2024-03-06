const User = require('../models/UserModel');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { uploadSingle, uploadMultiple, destroyUploaded } = require('../utils/cloudinaryUpload');
const { sendCodeToEmail, sendCodeToContact, verifyEmailAndContactCode, verifyAccount } = require('../utils/verification');
const sendSMS = require('../utils/sendSMS');
const AnnouncementModel = require('../models/AnnouncementModel');
const MessageModel = require('../models/MessageModel');
const ForumModel = require('../models/ForumModel');

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

exports.totalAnnouncements = async (req, res, next) => {

    try {

        const announcements = await AnnouncementModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalAnnoucements: announcements.length,
            latestAnnouncement: announcements[0],
        })

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}

exports.totalMessages = async (req, res, next) => {

    try {

        const messages = await MessageModel.find().sort({ createdAt: -1 });

        // Get the current date
        const currentDate = new Date();

        // Get the start of the current day
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        // Get the start of the current week (Sunday)
        const startOfWeek = new Date(startOfDay);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        // Get the start of the current month
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the start of the current year
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

        // Define aggregation pipeline to calculate average messages per interval
        const aggregationPipeline = [
            // Match messages within the desired date range
            {
                $match: {
                    createdAt: { $gte: startOfYear } // Adjust as needed
                }
            },
            // Group messages by date interval and count the number of messages
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d', // Correct format string for day
                            date: '$createdAt'
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            // Calculate the average messages per interval
            {
                $group: {
                    _id: null,
                    avgMessagesPerDay: { $avg: '$count' }
                }
            }
        ];


        // Execute the aggregation pipeline
        const result = await MessageModel.aggregate(aggregationPipeline);

        // Extract the average messages per interval from the result
        const averageMessagesPerDay = result.length > 0 ? result[0].avgMessagesPerDay : 0;
        const averageMessagesPerWeek = result.length > 0 ? result[0].avgMessagesPerWeek : 0;
        const averageMessagesPerMonth = result.length > 0 ? result[0].avgMessagesPerMonth : 0;
        const averageMessagesPerYear = result.length > 0 ? result[0].avgMessagesPerYear : 0;

        console.log('Average messages per day:', averageMessagesPerDay);
        console.log('Average messages per week:', averageMessagesPerWeek);
        console.log('Average messages per month:', averageMessagesPerMonth);
        console.log('Average messages per year:', averageMessagesPerYear);

        res.status(200).json({
            success: true,
            totalMessages: messages.length,
            averageMessagesPerDay: averageMessagesPerDay.toFixed(2)
        })

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}

exports.totalTopics = async (req, res, next) => {

    try {

        const topics = await ForumModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalTopics: topics.length,
            latestTopic: topics[0],
        })

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}