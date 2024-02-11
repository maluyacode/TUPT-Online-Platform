import * as Yup from 'yup';

const requiredMessage = 'This field is required'
const shortTextMessage = 'Wrong code'
const longTextMessage = 'This field must not be longer than 50 characters'

const LoginSchema = Yup.object().shape({

    email: Yup.string()
    .email('Invalid email address')
    .required(requiredMessage),

    password: Yup.string()
        // .min(6, shortTextMessage)
        // .max(50, longTextMessage)
        .required(requiredMessage),
});

export default LoginSchema