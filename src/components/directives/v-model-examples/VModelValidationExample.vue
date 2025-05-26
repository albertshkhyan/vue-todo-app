<script setup lang="ts">
import { ref, computed } from 'vue';

interface ValidationErrors {
  [key: string]: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = ref<ValidationErrors>({});

const validateUsername = (value: string): string => {
  if (!value) return 'Username is required';
  if (value.length < 3) return 'Username must be at least 3 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers and underscores';
  return '';
};

const validateEmail = (value: string): string => {
  if (!value) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Please enter a valid email address';
  return '';
};

const validatePassword = (value: string): string => {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
  return '';
};

const validateConfirmPassword = (value: string): string => {
  if (!value) return 'Please confirm your password';
  if (value !== formData.value.password) return 'Passwords do not match';
  return '';
};

const validateField = (field: keyof FormData, value: string): void => {
  switch (field) {
    case 'username':
      errors.value[field] = validateUsername(value);
      break;
    case 'email':
      errors.value[field] = validateEmail(value);
      break;
    case 'password':
      errors.value[field] = validatePassword(value);
      formData.value.confirmPassword && validateField('confirmPassword', formData.value.confirmPassword);
      break;
    case 'confirmPassword':
      errors.value[field] = validateConfirmPassword(value);
      break;
  }
};

const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0 && 
         Object.values(formData.value).every(value => value !== '');
});

const handleSubmit = (): void => {
  // Validate all fields
  Object.keys(formData.value).forEach(field => {
    validateField(field as keyof FormData, formData.value[field as keyof FormData]);
  });

  if (isFormValid.value) {
    console.log('Form submitted:', formData.value);
    // Reset form
    formData.value = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    errors.value = {};
  }
};
</script>

<template>
  <div class="v-model-validation">
    <h2>v-model with Form Validation</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label>Username:</label>
        <input 
          v-model="formData.username"
          @blur="validateField('username', formData.username)"
          type="text"
          placeholder="Enter username"
          :class="{ 'error': errors.username }"
        >
        <span class="error-message" v-if="errors.username">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input 
          v-model="formData.email"
          @blur="validateField('email', formData.email)"
          type="email"
          placeholder="Enter email"
          :class="{ 'error': errors.email }"
        >
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input 
          v-model="formData.password"
          @blur="validateField('password', formData.password)"
          type="password"
          placeholder="Enter password"
          :class="{ 'error': errors.password }"
        >
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label>Confirm Password:</label>
        <input 
          v-model="formData.confirmPassword"
          @blur="validateField('confirmPassword', formData.confirmPassword)"
          type="password"
          placeholder="Confirm password"
          :class="{ 'error': errors.confirmPassword }"
        >
        <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
      </div>

      <button 
        type="submit" 
        :disabled="!isFormValid"
        :class="{ 'disabled': !isFormValid }"
      >
        Submit
      </button>
    </form>

    <div class="preview">
      <h3>Form Data Preview:</h3>
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<style scoped>
.v-model-validation {
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