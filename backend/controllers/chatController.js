const Chat = require('../models/ChatModel');
const User = require('../models/UserModel')
const Message = require('../models/MessageModel');

exports.accessPrivateChat = async (req, res) => {

    const { userID } = req.body;

    let chat = await Chat.find({
        isGroup: false,
        $and: [
            { participants: { $elemMatch: { $eq: req.user._id } } },
            { participants: { $elemMatch: { $eq: userID } } },
        ],
    }).populate('participants')

    if (chat.length > 0) {
        const messages = await Message.find().where({ chat: chat[0]._id }).sort({ createdAt: 'asc' })
        res.status(200).json({
            sucess: true,
            chat: chat[0],
            messages: messages
        });
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            participants: [req.user._id, userID],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "participants",
            );
            return res.status(200).json(FullChat);
        } catch (error) {
            console.log(error)
            return res.status(400);
            // throw new Error(error.message);
        }
    }
}

exports.getUserChats = async (req, res) => {

    const userid = req.user._id;
    try {

        let chats = await Chat.find({
            isGroup: false,
            participants: userid,
        })
            .populate('participants')
            .populate({
                path: 'lastMessage',
                ref: 'message',
                populate: {
                    path: 'sender',
                    ref: 'User'
                }
            })

        res.status(200).json({
            success: true,
            chats: chats,
        })

    } catch (error) {
        console.log(error)
        return res.status(400);
    }

}