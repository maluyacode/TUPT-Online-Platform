const Group = require('../models/GroupModel');
const User = require('../models/UserModel');
const { uploadSingle, destroyUploaded } = require('../utils/cloudinaryUpload');
const mega = require('../utils/mega')

exports.getUsersTobeAdded = async (req, res, next) => {

    try {

        const users = await User.find({
            email: { $in: req.body.emails }
        });

        const registeredEmails = users.map(user => user.email);

        const notRegisteredEmails = req.body.emails.filter(email => !registeredEmails.includes(email));

        res.status(200).json({
            success: true,
            users: users,
            notRegisteredEmails: notRegisteredEmails
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.createGroup = async (req, res, next) => {
    try {

        req.body.members = JSON.parse(req.body.members)
        req.body.createdBy = req.user._id

        if (req.file) {
            const imageDetails = await uploadSingle(req.file.path, 'avatar');
            req.body.coverPhoto = imageDetails
        }

        const group = await Group.create(req.body);

        res.status(200).json({
            success: true,
            group: group,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.getGroups = async (req, res, next) => {
    try {

        let groupFilter = {}
        if (req.query.owner) {

            const user = await User.findById(req.query.owner);

            if (user.role !== 'admin') {
                groupFilter.createdBy = {
                    $eq: req.query.owner
                }
            }
        }

        const groups = await Group.find(groupFilter);

        res.status(200).json({
            success: true,
            groups: groups,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.getSingleGroup = async (req, res, next) => {

    try {

        const group = await Group.findById(req.params.id)
            .populate('members');

        const users = await User.find();

        res.status(200).json({
            success: true,
            group: group,
            users: users,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}

exports.updateGroup = async (req, res, next) => {

    try {

        let group = await Group.findById(req.params.id)
        req.body.members = JSON.parse(req.body.members)

        if (req.file) {
            if (group.coverPhoto) {
                destroyUploaded(group.coverPhoto.public_id)
            }
            const imageDetails = await uploadSingle(req.file.path, 'avatar');
            req.body.coverPhoto = imageDetails
        }

        group = await Group.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            success: true,
            group: group,
            message: 'Group successfully updated'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }

}

exports.deleteGroup = async (req, res, next) => {

    try {

        await Group.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Group successfully deleted'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
}