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

    avatar: Yup
        .mixed()
        .test("filesize", "File size is too large", (value) => {
            if (value && value?.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].size > 5 * 1000000) {
                        return false;
                    }
                }
            }
            return true;
        })
        .test("filetype", "Unsupported file format, please image only ", (value) => {
            if (value && value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].type != "image/png" && value[i].type != "image/jpg" && value[i].type != "image/jpeg") {
                        return false;
                    }
                }
            }
            return true;
        }),

    birthdate: Yup.date(),
    facebookLink: Yup.string(),
    instagramLink: Yup.string(),
    houseNo: Yup.string(),
    street: Yup.string(),
    baranggay: Yup.string(),
    city: Yup.string(),

});

export default RegisterSchema