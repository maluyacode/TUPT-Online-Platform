const Chat = require('../models/ChatModel');
const User = require('../models/UserModel')
const Message = require('../models/MessageModel');
// const { isNull } = require('util');
const Filter = require('bad-words')
const filipinoBarwords = require('filipino-badwords-list');
const { ObjectId } = require('mongodb');

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
            lastMessage: {
                $ne: null
            }
        }).populate('participants').populate({
            path: 'lastMessage',
            ref: 'message',
            populate: {
                path: 'sender',
                ref: 'User'
            }
        }).sort({ updatedAt: 'desc' })

        let filteredChats = chats.filter(chat => chat.lastMessage !== null);

        res.status(200).json({
            success: true,
            chats: filteredChats,
        })

    } catch (error) {
        console.log(error)
        return res.status(400);
    }

}

exports.geAllChats = async (req, res, next) => {

    try {

        const filter = new Filter({ list: filipinoBarwords.array });

        let chats = await Chat.find({
            lastMessage: {
                $exists: true,
                $ne: null,
            }
        }).populate({
            path: 'participants',
            model: 'User'
        }).populate({
            path: 'lastMessage',
            model: 'Message',
            populate: {
                path: 'sender',
                model: 'User'
            }
        });

        const messages = await Message.find();

        chats = chats.filter(chat => chat.lastMessage !== null && chat.participants.length >= 2);

        chats = chats.map(chat => {
            const resChat = chat;
            let flagCount = 0;
            const chatMessage = messages.filter(message => {
                if (message.chat.toString() === chat._id.toString()) {
                    if (message.content !== filter.clean(message.content) && message.deletedAt === null) {
                        flagCount++;
                    }
                    return message
                }
            })
            resChat.messages = chatMessage
            resChat.flagCount = flagCount
            return chat;
        })

        chats.sort((a, b) => b.flagCount - a.flagCount);

        res.status(200).json({
            success: true,
            chats: chats
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'System error, try again later'
        });
    }

}

exports.getConversation = async (req, res, next) => {

    try {

        const chat = await Chat.findById(req.params.id)
            .populate('participants');

        const messages = await Message.find({ chat: chat._id })
            .populate('sender')
            .sort({ createdAt: 1 })

        return res.status(200).json({
            success: true,
            chat: chat,
            messages: messages,
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'System error, try again later'
        });
    }

}