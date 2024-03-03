const CommentModels = require('../models/CommentModels');
const Forum = require('../models/ForumModel');
const { uploadSingle, destroyUploaded, uploadMultiple } = require('../utils/cloudinaryUpload');
const mega = require('../utils/mega')

exports.createPost = async (req, res, next) => {

    try {

        req.body.category = JSON.parse(req.body.category).map(data => {
            return data.value
        })

        req.body.postedBy = req.user._id;

        if (req.files) {

            if (req.files.images) {
                req.body.images = await uploadMultiple(req.files.images, 'forums') // get image details - cloudinary
            }

            if (req.files.attachments) {
                let filesLink = [];
                for (i in req.files.attachments) {

                    const files = req.files.attachments

                    const result = await mega.uploadFile(files[i].originalname, files[i].path) // get file details - megajs
                    filesLink.push(result);

                }
                req.body.attachments = filesLink
            }
        }

        const collabTopic = await Forum.create(req.body);

        return res.status(200).json({
            success: true,
            message: 'Posted successfully',
            collabTopic: collabTopic
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.getAllTopics = async (req, res, next) => {

    try {

        const topics = await Forum.find()
            .populate('postedBy')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            topics: topics
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.getSingleTopic = async (req, res, next) => {

    try {

        const topic = await Forum.findById(req.params.id)
            .populate('postedBy');

        const comments = await CommentModels.find({ forum: topic._id, deletedAt: null })
            .populate('forum')
            .populate({
                path: 'repliedTo',
                model: 'comment',
                populate: {
                    path: 'commentedBy',
                    model: 'User'

                }
            })
            .populate('commentedBy')

        return res.status(200).json({
            success: true,
            topic: topic,
            comments: comments
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}