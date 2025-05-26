<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';

const email = ref<string>('');
const password = ref<string>('');

const handleLogin = (): void => {
  console.log('Login attempt:', { email: email.value, password: password.value });
  // Reset form
  email.value = '';
  password.value = '';
};
</script>

<template>
  <div class="multiple-v-model-example">
    <h2>Multiple v-model Example</h2>
    
    <LoginForm
      v-model:email="email"
      v-model:password="password"
    />

    <div class="preview">
      <h3>Form Data Preview:</h3>
      <pre>{{ { email, password } }}</pre>
    </div>

    <button 
      @click="handleLogin"
      :disabled="!email || !password"
      :class="{ 'disabled': !email || !password }"
    >
      Login
    </button>
  </div>
</template>

<style scoped>
.multiple-v-model-example {
  padding: 1rem;
  border: 1px solid #42b983;
  border-radius: 8px;
  margin: 1rem 0;
}

.preview {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 4px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #2c3e50;
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
</style> 