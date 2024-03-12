const VideoTutorial = require('../models/VideoTutorialModel');
const crypto = require('crypto');
const { uploadSingle, uploadMultiple, destroyUploaded, uploadVideo } = require('../utils/cloudinaryUpload');

exports.create = async (req, res, next) => {

    try {

        if (req.file) {
            req.body.video = await uploadVideo(req.file, "videos")
        }

        const videoTutorial = await VideoTutorial.create(req.body);

        return res.status(200).json({
            success: true,
            message: "Video uploaded",
            videoTutorial: videoTutorial
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.update = async (req, res, next) => {

    try {

        if (req.file) {
            req.body.video = await uploadVideo(req.file, "videos")
        }

        const videoTutorial = await VideoTutorial.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Video tutorial updated",
            videoTutorial: videoTutorial
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.getAll = async (req, res, next) => {

    try {

        const filterOption = {};

        if (req.query.user) {
            filterOption.isDisabled = false
        }

        const videoTutorials = await VideoTutorial.find(filterOption);

        return res.status(200).json({
            success: true,
            message: "Video uploaded",
            videoTutorials: videoTutorials
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.getSingle = async (req, res, next) => {

    try {

        const videoTutorial = await VideoTutorial.findById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Video uploaded",
            videoTutorial: videoTutorial
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.disable = async (req, res, next) => {

    try {

        const videoTutorial = await VideoTutorial.findById(req.params.id);

        if (req.query.status === 'enable') {
            videoTutorial.isDisabled = false
        } else {
            videoTutorial.isDisabled = true
        }
        videoTutorial.save();

        return res.status(200).json({
            success: true,
            message: "Tutorial no longer available to user",
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}


exports.delete = async (req, res, next) => {

    try {

        const videoTutorial = await VideoTutorial.findById(req.params.id);

        if (videoTutorial.video) {
            destroyUploaded(videoTutorial.video.public_id)
        }

        await VideoTutorial.findByIdAndDelete(videoTutorial._id);

        return res.status(200).json({
            success: true,
            message: "Video tutorial successfully deleted",
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}