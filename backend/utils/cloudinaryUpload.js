const cloudinary = require('cloudinary')

exports.uploadSingle = async (postImage, folderName) => {

    const result = await cloudinary.v2.uploader.upload(postImage, {
        folder: `tupt-online-platform/${folderName}`, // folder name in cloudinary, if not exist it will create automatically.
        // width: 200, 
        // crop: "scale",
    });

    return {
        public_id: result.public_id,
        url: result.secure_url
    }
}

exports.uploadMultiple = async (postImages, folderName) => {

    let images = []
    for (let i = 0; i < postImages.length; i++) {

        let image = postImages[i].path;

        const result = await cloudinary.v2.uploader.upload(image, {
            folder: `tupt-online-platform/${folderName}`, // folder name in cloudinary, if not exist it will create automatically.
            // width: 200, 
            // crop: "scale",
        });

        images.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    return images
}

exports.destroyUploaded = (imagePublicId) => {
    cloudinary.v2.uploader.destroy(imagePublicId);
}