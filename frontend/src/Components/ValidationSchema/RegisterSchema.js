import * as Yup from 'yup';

const requiredMessage = 'This field is required'
const shortTextMessage = 'Please provide atleast 2 characters'
const longTextMessage = 'This field must not be longer than 50 characters'

const RegisterSchema = Yup.object().shape({

    firstname: Yup.string()
        .min(2, shortTextMessage)
        .max(50, longTextMessage)
        .required(requiredMessage),

    lastname: Yup.string()
        .min(2, shortTextMessage)
        .max(50, longTextMessage)
        .required(requiredMessage),

    contact_number: Yup.string()
        .matches(/^09\d{9}$/, 'Invalid contact number')
        // .min(11, 'Invalid contact number')
        // .max(11, 'Invalid contact number')
        .required(requiredMessage),

    email: Yup.string()
        .email('Invalid email address')
        .required(requiredMessage),

    password: Yup.string()
        .min(8, 'Please provide atleast 8 characters')
        .required(requiredMessage),

    role: Yup.string()
        .oneOf(['student', 'teacher', 'parent'], 'Role must be either student, teacher, or parent')
        .required('Role is required'),


});

export default RegisterSchema