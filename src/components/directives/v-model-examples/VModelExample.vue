<script setup lang="ts">
import { ref } from 'vue';

interface FormData {
  name: string;
  email: string;
  age: number;
  isSubscribed: boolean;
  selectedOption: string;
}

const formData = ref<FormData>({
  name: '',
  email: '',
  age: 18,
  isSubscribed: false,
  selectedOption: 'option1'
});

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const handleSubmit = (): void => {
  console.log('Form submitted:', formData.value);
  // Reset form
  formData.value = {
    name: '',
    email: '',
    age: 18,
    isSubscribed: false,
    selectedOption: 'option1'
  };
};
</script>

<template>
  <div class="v-model-example">
    <h2>v-model Directive Example</h2>
    <h3>2 way binding</h3>

    <p>v-model is a directive used to work with form inputs. It is syntactic sugar that creates two-way data binding using reactive variables and events under the hood.</p>
    
    <!-- v-model is a two-way binding directive that combines v-bind and @input
         It's equivalent to:
         <input 
           :value="formData.name"
           @input="formData.name = $event.target.value"

           v-model is syntactic sugar in Vue.
           It combines:
           Binding a reactive value (:value="...")
           Listening to an input/update event (@input="..." or @update:modelValue="...")

           v-model is equivalent to:
           <input 
             :value="formData.name"
             @input="formData.name = $event.target.value"
           >
           
         > -->
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label>Name:</label>
        <input 
          v-model="formData.name"
          type="text"
          placeholder="Enter your name"
        >
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input 
          v-model="formData.email"
          type="email"
          placeholder="Enter your email"
        >
      </div>

      <div class="form-group">
        <label>Age:</label>
        <input 
          v-model.number="formData.age"
          type="number"
          min="0"
          max="120"
        >
      </div>

      <div class="form-group">
        <label>Subscribe to newsletter:</label>
        <input 
          v-model="formData.isSubscribed"
          type="checkbox"
        >
      </div>

      <div class="form-group">
        <label>Select an option:</label>
        <select v-model="formData.selectedOption">
          <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>

    <div class="preview">
      <h3>Form Data Preview:</h3>
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<style scoped>
.v-model-example {
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

input[type="text"],
input[type="email"],
input[type="number"],
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #42b983;
  border-radius: 4px;
  font-size: 1rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;
}

button:hover {
  background-color: #3aa876;
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