const User = require('../models/UserModel')
const Chat = require('../models/ChatModel')
const Message = require('../models/MessageModel');
const sendSMS = require('../utils/sendSMS');
const { ObjectId } = require('mongodb');

exports.sendMessage = async (req, res, next) => {

    await Message.deleteMany({ sender: '65e930c4e10fdd4f4867db75' })
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        readBy: [req.user._id]
    };

    try {
        const message = await Message.create(newMessage);

        const chat = await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message._id
        });

        res.json(message);
    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }
    // res.json(message);
}


exports.notifyUser = async (req, res, next) => {

    try {

        const users = req.body.sendTo;

        req.body.message = `${req.body.message} \n\nFrom: ${req.user.firstname} ${req.user.lastname}`
        for (let i in users) {
            setTimeout(async () => {
                await sendSMS({
                    message: req.body.message,
                    phone: users[i].contact_number,
                })
            }, 2000)
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Notify'
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}

exports.hideMessage = async (req, res, next) => {

    try {

        const message = await Message.findById(req.params.id);
        message.deletedAt = new Date();
        message.save();

        res.status(200).json({
            success: true,
            message: 'Message successfully hidden'
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}