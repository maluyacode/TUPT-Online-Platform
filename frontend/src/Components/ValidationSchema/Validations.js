let message = [];
export const Validate = (data) => {
    const keys = Object.keys(data);


    keys.forEach(key => {
        const type = typeof data[key];

        if (type === 'string') {
            stringValidate(data, key)
        }

        if (type === 'object') {
            if (Array.isArray(data[key])) {
                arrayValidate(data, key)
            } else {
                objectValidate(data, key)
            }
        }

    });

    return message
}

const stringValidate = (data, key) => {
    console.log(`string: ${data[key]}`)
    if (data[key] === '') {
        message.push(`${key} is required`)
    }
}

const objectValidate = (data, key) => {
    console.log(`object ${data[key]}`)
}

const arrayValidate = (data, key) => {
    console.log(data[key].length)
    if (data[key].length < 0) {
        message.push(`${key} is required`)
    }
}
