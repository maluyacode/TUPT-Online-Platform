const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, HeadingLevel, TextRun } = docx;

const projectFolderPath = './'; // Assuming the project folder is in the current directory
const outputPath = 'output.docx';

const filesContent = [];

// Recursively read files in the project folder
// Recursively read files in the project folder
function readFilesInFolder(folderPath) {
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
        const filePath = path.join(folderPath, file); // Create the absolute path
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            if (file !== 'node_modules') {
                readFilesInFolder(filePath);
            }
        } else {
            // Check if the file has a .js extension
            if (path.extname(file) === '.js') {
                const content = fs.readFileSync(filePath, 'utf-8');
                filesContent.push({ path: filePath, content });
            }
        }
    });
}


readFilesInFolder(projectFolderPath);

// Create a new document'

const section = filesContent.map(file => {

    const lines = file.content.split('\n');
    const codeRuns = lines.map(line => new TextRun({ text: line, font: 'Courier New' }));
    console.log(file.content)
    return {
        properties: {},
        children: [
            new Paragraph({
                text: file.path,
                heading: HeadingLevel.HEADING_1,
            }),
            ...file.content.split('\n').map(line => (
                new Paragraph({
                    children: [
                        new TextRun({
                            text: line.replace(/ /g, '\u00A0').replace(/\t/g, '\u00A0\u00A0\u00A0\u00A0'), // Replace spaces and tabs with non-breaking spaces
                            font: 'Courier New',
                        }),
                    ],
                })
            )),
        ],
    }
})
console.log(section[0].children[0])
const doc = new Document({
    creator: 'Dave Merc Adlawan',
    sections: section,
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(outputPath, buffer);
    console.log(`Document saved to ${outputPath}`);
}).catch(err => {
    console.error('Error saving document:', err);
});
