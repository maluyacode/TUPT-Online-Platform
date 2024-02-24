const Announcement = require('../models/AnnouncementModel')
const { uploadSingle, destroyUploaded, uploadMultiple } = require('../utils/cloudinaryUpload');
const mega = require('../utils/mega')

exports.createAnnouncement = async (req, res, next) => {
    try {

        req.body.createdBy = req.user._id;
        req.body.canViewBy = JSON.parse(req.body.canViewBy);
        if (req.body.groupViewers === 'all') {
            delete req.body.groupViewers
            req.body.isForAll = true
        } else {
            req.body.isForAll = false
        }

        if (req.files) {

            if (req.files.images) {
                req.body.images = await uploadMultiple(req.files.images, 'announcements') // get image details - cloudinary
            }

            if (req.files.files) {
                let filesLink = [];
                for (i in req.files.files) {

                    const files = req.files.files

                    const result = await mega.uploadFile(files[i].originalname, files[i].path) // get file details - megajs
                    filesLink.push(result);

                }
                req.body.attachments = filesLink
            }
        }

        const announcement = await Announcement.create(req.body);

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not posted'
            })
        }

        res.status(200).json({
            success: true,
            announcement: announcement,
            message: 'Announcement already posted'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.getAllAnnouncements = async (req, res, next) => {
    try {

        const announcements = await Announcement.find({
            isForAll: true
        })

        return res.status(200).json({
            success: true,
            announcements: announcements
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.getAnnouncementForGroup = async (req, res, next) => {

}

exports.getSingleAnnouncement = async (req, res, next) => {
    try {

        const announcement = await Announcement.findById(req.params.id);

        return res.status(200).json({
            success: true,
            announcement: announcement
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.updateAnnouncement = async (req, res, next) => {

}

exports.deleteAnnouncement = async (req, res, next) => {

}