// File: src/components/LoginValidation.ts

interface Values {
  username: string;
  pin: string;
}

interface Errors {
  username?: string;
  pin?: string;
}

const LoginValidation = (values: Values): Errors => {
  // Initialize error object
  let errors: Errors = {};

  // Check username validity
  if (values.username === '') {
    errors.username = 'Username is required';
  } else {
    errors.username = '';
  }

  // Check pin validity
  const pin_pattern = /^\d{4}$/;
  if (values.pin === '') {
    errors.pin = 'PIN is required';
  } else if (!pin_pattern.test(values.pin)) {
    errors.pin = 'PIN must be a 4-digit number';
  } else {
    errors.pin = '';
  }

  // Return the error object
  return errors;
};

export default LoginValidation;
