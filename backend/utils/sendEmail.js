const nodemailer = require('nodemailer');

const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: `<pre style="font-size: 18px;">${options.message}</pre>`
    }

    if (options.attachments?.length > 0) {
        message.attachments = options.attachments.map(file => {
            return {
                filename: file.originalname,
                path: file.path
            }
        })
    }

    await transporter.sendMail(message)
    return 0;
}

module.exports = sendEmail;