const { Storage } = require('megajs');
const fs = require('fs').promises;

let storage;

exports.connect = async () => {
    storage = new Storage({
        email: process.env.MEGA_EMAIL,
        password: process.env.MEGA_PASSWORD,
        // userAgent: 'ExampleApplication/1.0'
    });

    // Will resolve once the user is logged in
    // or reject if some error happens
    storage.ready
        .then(() => {
            console.log('Storage is ready!');
        })
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

exports.getStorageInstance = () => {
    if (!storage) {
        throw new Error('Storage is not connected. Call connect() first.');
    }
    return storage;
}

exports.uploadFile = async (name, filePath) => {

    await storage.ready;

    const fileToUpload = await fs.readFile(filePath);

    const folder = storage.root.children.find(folder => folder.name === 'TUPT-Online-Platform');
    if (!folder) {
        console.error('Folder not found');
        return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-PH', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const fileName = `${formattedDate}_${name}`;

    // Upload the file
    const file = await folder.upload({ name: fileName }, fileToUpload).complete;

    const result = await getFileDetails(fileName, name);
    return result;
}

const getFileDetails = async (name, originalName) => {
    await storage.ready;

    const resultFile = storage.root.children.find(folder => folder.name === 'TUPT-Online-Platform').children.find(file => file.name === name);

    if (!resultFile) {
        console.error('File not found');
        return;
    }

    return {
        public_id: resultFile.name,
        url: await resultFile.link(),
        original_name: originalName,
    };
}


