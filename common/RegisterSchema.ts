import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  fullname:   yup.string().required().min(3).max(50).matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Please enter valid name'),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(50).required(),
  phone: yup.string().min(10).max(10).required(),
  gender: yup.string().required(),
  dob: yup.date().required(),
  username: yup.string().min(3).max(50).required(),
});

export default RegisterSchema;
