const Comment = require('../models/CommentModels');
const { uploadSingle, destroyUploaded, uploadMultiple } = require('../utils/cloudinaryUpload');
const mega = require('../utils/mega');

exports.createComment = async (req, res, next) => {

    try {

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

        req.body.commentedBy = req.user._id
        req.body.forum = req.body.forumId

        const comment = await Comment.create(req.body);

        return res.status(200).json({
            success: true,
            message: 'Comment posted!',
            comment: comment
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.deleteComment = async (req, res, next) => {

    try {

        const comment = await Comment.findById(req.params.id);
        comment.deletedAt = Date.now();
        
        comment.save();

        return res.status(200).json({
            success: true,
            message: 'Comment deleted!',
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}