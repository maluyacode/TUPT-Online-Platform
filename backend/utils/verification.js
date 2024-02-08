const generateCode = require('../utils/generateCode')
const sendEmail = require('../utils/sendEmail')

exports.sendCodeToEmail = (user, code) => {
    sendEmail({
        email: user.email,
        subject: 'Verification Code',
        message: `This is your verification code ${code}. This will be valid in 5 minutes`
    })
}

exports.sendCodeToContact = async (user, code) => {
    const message = {
        to: user.contact_number,
        message: `This is your code ${code}, this will be valid within 5 minutes`,
    }
    const response = await fetch("https://www.traccar.org/sms", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "e006vp9yRn-bZ3QJKzmLlM:APA91bFeF8scysDM18lxjOS1mv44RJZHhgwuRzpV8Vm7EV3EgNcp90muz4UsLMIA4LB8wa9IOCOONpHfcFbGAIe3vIY1nzVctaTswAedD5alleJEwKEJ3L99iTolKT4tfDdFfJCUQlUf"
        },
        body: JSON.stringify(message)
    })
    console.log(response)
}