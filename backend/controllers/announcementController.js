const Announcement = require('../models/AnnouncementModel');
const Group = require('../models/GroupModel');
const User = require('../models/UserModel')
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

        const newAnnouncement = await announcement.populate({
            path: 'groupViewers',
            ref: 'group',
            populate: {
                path: 'members',
                ref: 'user',
            }
        });

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not posted'
            })
        }

        res.status(200).json({
            success: true,
            announcement: newAnnouncement,
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

        let announcementFilter = {
            isForAll: true,
            $or: [
                { deletedAt: null },
                { deletedAt: { $exists: false } }
            ]
        }



        if (req.query.today === 'true') {
            const today = new Date();
            today.setHours(0, 0, 0, 0)
            // announcementFilter.createdAt = {
            //     $gte: today
            // }
            announcementFilter.updatedAt = {
                $gte: today
            }
        }

        if (req.user.role === 'admin') {
            announcementFilter = {};
        }

        const announcements = await Announcement.find(announcementFilter).populate({
            path: 'groupViewers',
            ref: 'group'
        }).populate({
            path: 'createdBy',
            ref: 'user'
        }).sort({ updatedAt: -1 })

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

    try {

        const announcements = await Announcement.find({
            groupViewers: req.params.id,
            $or: [
                { deletedAt: null },
                { deletedAt: { $exists: false } }
            ]
        }).populate({
            path: 'groupViewers',
            ref: 'group',
            // populate: {
            //     path: 'members',
            //     ref: 'users',
            // }
        }).populate({
            path: 'createdBy',
            ref: 'user',
        }).sort({ updatedAt: -1 });

        const group = await Group.findById(req.params.id).populate('createdBy');

        return res.status(200).json({
            success: true,
            announcements: announcements,
            group: group
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.getAnnouncementsOfTeacher = async (req, res, next) => {

    try {

        let announcementFilter = {
            createdBy: req.params.id,
            $or: [
                { deletedAt: null },
                { deletedAt: { $exists: false } }
            ]
        }

        if (req.query.fetchArchived === 'true') {
            delete announcementFilter.$or
            announcementFilter.deletedAt = {
                $ne: null
            }
        }

        const announcements = await Announcement.find(announcementFilter).populate({
            path: 'groupViewers',
            ref: 'group',
            // populate: {
            //     path: 'members',
            //     ref: 'users',
            // }
        }).sort({ updatedAt: -1 });

        const teacher = await User.findById(req.params.id);

        return res.status(200).json({
            success: true,
            announcements: announcements,
            teacher: teacher
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.getSingleAnnouncement = async (req, res, next) => {
    try {

        const announcement = await Announcement.findById(req.params.id)
            .where({
                $or: [
                    { deletedAt: null },
                    { deletedAt: { $exists: false } }
                ]
            })
            .populate({
                path: 'groupViewers',
                ref: 'group'
            }).populate('createdBy')

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
    try {

        let announcement = await Announcement.findById(req.params.id);

        req.body.canViewBy = JSON.parse(req.body.canViewBy);
        if (req.body.groupViewers === 'all') {
            delete req.body.groupViewers
            req.body.isForAll = true
        } else {
            req.body.isForAll = false
        }


        if (req.files.images) {

            if (announcement.images.length > 0) {
                const images = announcement.images;
                for (i in images) {
                    destroyUploaded(images[i].public_id)
                }
            }

            req.body.images = await uploadMultiple(req.files.images, 'announcements') // get image details - cloudinary
        }

        if (req.files.files) {

            if (announcement.attachments.length > 0) {
                const attachments = announcement.attachments;
                for (i in attachments) {
                    mega.destroyFile(attachments[i].public_id)
                }
            }

            let filesLink = [];
            for (i in req.files.files) {
                console.log(req.files.files)
                const files = req.files.files

                const result = await mega.uploadFile(files[i].originalname, files[i].path) // get file details - megajs
                console.log(result)
                filesLink.push(result);

            }
            req.body.attachments = filesLink
        }

        announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body)

        return res.status(200).json({
            success: true,
            message: 'Reannounced successfully!',
            announcement: announcement
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.softDelete = async (req, res, next) => {
    try {

        await Announcement.updateOne(
            { _id: req.params.id },
            { $set: { deletedAt: new Date() }, $unset: { updatedAt: '' } }
        );

        return res.status(200).json({
            success: true,
            message: 'Archived successfully. You can review your archived items.'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.recover = async (req, res, next) => {
    try {

        await Announcement.updateOne(
            { _id: req.params.id },
            { $set: { deletedAt: null }, $unset: { updatedAt: '' } }
        );

        return res.status(200).json({
            success: true,
            message: 'Unarchived successfully'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.deleteAnnouncement = async (req, res, next) => {
    try {

        await Announcement.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Announcement deleted successfully'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}