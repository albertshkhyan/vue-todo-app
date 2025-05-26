<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  email: string;
  password: string;
}

interface Emits {
  (e: 'update:email', value: string): void;
  (e: 'update:password', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Computed properties for two-way binding
const emailModel = computed({
  get: () => props.email,
  set: (value: string) => emit('update:email', value)
});

const passwordModel = computed({
  get: () => props.password,
  set: (value: string) => emit('update:password', value)
});

// Validation
const emailError = computed(() => {
  if (!emailModel.value) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailModel.value)) return 'Please enter a valid email';
  return '';
});

const passwordError = computed(() => {
  if (!passwordModel.value) return 'Password is required';
  if (passwordModel.value.length < 8) return 'Password must be at least 8 characters';
  return '';
});

const isValid = computed(() => !emailError.value && !passwordError.value);
</script>

<template>
  <div class="login-form">
    <div class="form-group">
      <label>Email:</label>
      <input 
        v-model="emailModel"
        type="email"
        placeholder="Enter your email"
        :class="{ 'error': emailError }"
      >
      <span class="error-message" v-if="emailError">{{ emailError }}</span>
    </div>

    <div class="form-group">
      <label>Password:</label>
      <input 
        v-model="passwordModel"
        type="password"
        placeholder="Enter your password"
        :class="{ 'error': passwordError }"
      >
      <span class="error-message" v-if="passwordError">{{ passwordError }}</span>
    </div>

    <div class="form-info">
      <p>This component uses multiple v-model bindings:</p>
      <pre>
&lt;LoginForm
  v-model:email="email"
  v-model:password="password"
/&gt;
      </pre>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  padding: 1rem;
  border: 1px solid #42b983;
  border-radius: 8px;
  margin: 1rem 0;
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

.form-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 4px;
}

pre {
  background-color: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style> 