import * as Yup from 'yup';

const requiredMessage = 'This field is required'
const shortTextMessage = 'Atleast 6 characters'
const longTextMessage = 'This field must not be longer than 50 characters'
const imageMessage = 'Invalid image format';

const PostSchema = Yup.object().shape({

    title: Yup.string()
        .required(requiredMessage),

    groupViewers: Yup.object()
        .required(requiredMessage),

    content: Yup.string()
        .min(6, shortTextMessage)
        .required(requiredMessage),

    images: Yup
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

    files: Yup.mixed()
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
        .test("filetype", "Unsupported file format. Documents are only accepted eg. pdf, docx, etc.", (value) => {
            if (value && value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].type == "image/png" && value[i].type == "image/jpg" && value[i].type == "image/jpeg") {
                        return false;
                    }
                }
            }
            return true;
        }),

    canViewBy: Yup.array()
        .of(Yup.string().oneOf(['parent', 'teacher', 'student']))
        .min(1, 'At least one viewer type must be selected')
        .required('Viewer type is required'),
});

export default PostSchema