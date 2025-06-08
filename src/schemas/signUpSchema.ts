import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be at most 20 characters')
    .required('Name is required'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^\+375\((29|33|44)\)-\d{3}-\d{2}-\d{2}$/,
      'Invalid phone format. Expected: +375(XX)-XXX-XX-XX'
    ),

  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Password must be at most 15 characters')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(
      /[!@#$%^&]/,
      'Password must contain at least one special character (!@#$%^&)'
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),

  birthDate: yup
    .string()
    .required('Date of birth is required')
    .test('is-adult', 'You must be at least 16 years old', (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 16;
    }),
});
