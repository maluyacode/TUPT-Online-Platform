const User = require('../models/UserModel')
const Chat = require('../models/ChatModel')
const Message = require('../models/MessageModel')

exports.sendMessage = async (req, res, next) => {
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