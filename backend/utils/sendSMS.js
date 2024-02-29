
const sendSMS = async data => {

    const message = {
        to: data.phone,
        message: data.message,
    }
    console.log(data.phone)
    const response = await fetch(process.env.TRACCAR_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.TRACCAR_AUTH
        },
        body: JSON.stringify(message)
    })
    console.log(response)

}

module.exports = sendSMS