<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

// Define validation schema using Yup
const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

// Initialize form with VeeValidate
const { handleSubmit, values, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
});

// Define form fields with validation
const [username, usernameAttrs] = defineField('username');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

// Handle form submission
const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values);
  // Reset form
  username.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
});
</script>

<template>
  <div class="vee-validate-example">
    <h2>Form Validation with VeeValidate + Yup</h2>
    
    <form @submit="onSubmit" class="form">
      <div class="form-group">
        <label>Username:</label>
        <input 
          v-model="username"
          v-bind="usernameAttrs"
          type="text"
          placeholder="Enter username"
          :class="{ 'error': errors.username }"
        >
        <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input 
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          placeholder="Enter email"
          :class="{ 'error': errors.email }"
        >
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input 
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          placeholder="Enter password"
          :class="{ 'error': errors.password }"
        >
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label>Confirm Password:</label>
        <input 
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          type="password"
          placeholder="Confirm password"
          :class="{ 'error': errors.confirmPassword }"
        >
        <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
      </div>

      <button 
        type="submit"
        :disabled="Object.keys(errors).length > 0"
        :class="{ 'disabled': Object.keys(errors).length > 0 }"
      >
        Submit
      </button>
    </form>

    <div class="preview">
      <h3>Form Data Preview:</h3>
      <pre>{{ values }}</pre>
    </div>
  </div>
</template>

<style scoped>
.vee-validate-example {
  padding: 1rem;
  border: 1px solid #42b983;
  border-radius: 8px;
  margin: 1rem 0;
}

.form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #42b983;
  border-radius: 4px;
  font-size: 1rem;
}

input.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

button:hover:not(.disabled) {
  background-color: #3aa876;
}

button.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.preview {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 4px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #2c3e50;
}
</style> 