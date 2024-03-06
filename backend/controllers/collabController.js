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

exports.updatePost = async (req, res, next) => {

    try {

        const topic = await Forum.findById(req.params.id);

        req.body.category = JSON.parse(req.body.category).map(data => {
            return data.value
        })

        if (req.files) {

            if (req.files.images) {

                topic.images.map(image => {
                    destroyUploaded(image.public_id);
                })

                req.body.images = await uploadMultiple(req.files.images, 'forums') // get image details - cloudinary
            }

            if (req.files.attachments) {
                let filesLink = [];

                topic.attachments.map(attachment => {
                    mega.destroyFile(attachment.public_id);
                })

                for (i in req.files.attachments) {

                    const files = req.files.attachments

                    const result = await mega.uploadFile(files[i].originalname, files[i].path) // get file details - megajs
                    filesLink.push(result);

                }
                req.body.attachments = filesLink
            }
        }

        const updatedTopic = await Forum.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Updated successfully',
            topic: updatedTopic
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

        const filterOptions = {
            deletedAt: null,
        }

        if (req.query.fetchStatus !== 'all') {
            filterOptions.postedBy = req.user._id
        }

        let topics = await Forum.find(filterOptions)
            .populate('postedBy')
            .sort({ createdAt: -1 })

        const fetchTopics = []

        for (let topic of topics) {
            try {

                const comment = await CommentModels.find({ forum: topic._id, deletedAt: null })
                    .populate('commentedBy')
                    .sort({ createdAt: -1 });

                topic.commentCount = comment.length;
                topic.latestComment = comment[0];
                fetchTopics.push(topic);

            } catch (error) {
                console.error('Error fetching latest comment for topic:', error);
            }
        }

        console.log(fetchTopics);

        return res.status(200).json({
            success: true,
            topics: fetchTopics
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

exports.deleteTopic = async (req, res, next) => {

    try {

        const topic = await Forum.findById(req.params.id);
        topic.deletedAt = Date.now();
        topic.save();

        return res.status(200).json({
            success: true,
            message: 'Topic deleted successfully'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.destroyTopic = async (req, res, next) => {

    try {

        await Forum.findByIdAndDelete(req.param.id);

        return res.status(200).json({
            success: true,
            message: 'Topic no longer available'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}