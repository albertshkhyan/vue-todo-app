<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input
      type="text"
      v-model="newTodo"
      placeholder="What needs to be done?"
      class="todo-input"
    />
    <button type="submit" class="add-btn">Add</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add', text: string): void;
}>();

const newTodo = ref('');

const handleSubmit = () => {
  const text = newTodo.value.trim();
  if (text) {
    emit('add', text);
    newTodo.value = '';
  }
};
</script>

<style scoped>
.todo-form {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.7rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 7px;
  font-size: 1.1rem;
  background: #f7f7f7;
  transition: border 0.2s, box-shadow 0.2s;
}

.todo-input:focus {
  border-color: #4CAF50;
  background: #fff;
  box-shadow: 0 2px 8px rgba(76,175,80,0.08);
  outline: none;
}

.add-btn {
  padding: 0.7rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(76,175,80,0.08);
}

.add-btn:hover, .add-btn:focus {
  background-color: #388e3c;
  box-shadow: 0 4px 16px rgba(76,175,80,0.12);
}
</style> 