import * as Yup from 'yup';

const requiredMessage = 'This field is required'
const shortTextMessage = 'Wrong code'
const longTextMessage = 'This field must not be longer than 50 characters'

const VerificationSchema = Yup.object().shape({

    emailCode: Yup.string(),
    // .min(6, shortTextMessage)
    // .max(50, longTextMessage)
    // .required(requiredMessage),

    contactCode: Yup.string()
    // .min(6, shortTextMessage)
    // .max(50, longTextMessage)
    // .required(requiredMessage),
});

export default VerificationSchema