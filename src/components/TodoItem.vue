<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
    />
    <div v-if="!isEditing" class="todo-content" @dblclick="startEditing">
      {{ todo.text }}
    </div>
    <input
      v-else
      type="text"
      v-model="editedText"
      @blur="finishEditing"
      @keyup.enter="finishEditing"
      @keyup.esc="cancelEditing"
      ref="editInput"
    />
    <button class="delete-btn" @click="$emit('delete', todo.id)">×</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '../types/todo';

const props = defineProps<{
  todo: Todo;
}>();

// Define the emit events, custom events - this means that the component can emit events to the parent component
const emit = defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'delete', id: number): void;
  (e: 'edit', id: number, text: string): void;
}>();

// State variables, reactive variables - this means that the variables are reactive and will update when the value changes
const isEditing = ref(false);
const editedText = ref(props.todo.text);
const editInput = ref<HTMLInputElement | null>(null);

// Functions
const startEditing = () => {
  isEditing.value = true;
  editedText.value = props.todo.text;
  setTimeout(() => editInput.value?.focus(), 0);
};

const finishEditing = () => {
  if (editedText.value.trim()) {
    emit('edit', props.todo.id, editedText.value.trim());
  }
  isEditing.value = false;
};

const cancelEditing = () => {
  isEditing.value = false;
  editedText.value = props.todo.text;
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #ececec;
  background: #fff;
  color: #222;
  transition: box-shadow 0.2s, background 0.2s;
  border-radius: 7px;
  margin: 0.3rem 0.7rem;
  box-shadow: 0 1px 4px rgba(60,60,60,0.04);
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background: #f6fff7;
  box-shadow: 0 2px 12px rgba(76,175,80,0.08);
}

.todo-item.completed .todo-content {
  text-decoration: line-through;
  color: #bdbdbd;
  opacity: 0.7;
}

.todo-content {
  flex: 1;
  margin: 0 1rem;
  cursor: pointer;
  font-size: 1.13rem;
  letter-spacing: 0.01em;
  transition: color 0.2s;
  color: #222;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0 0.5rem;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover, .delete-btn:focus {
  background: #ffeaea;
  color: #d32f2f;
}

input[type="text"] {
  flex: 1;
  margin: 0 1rem;
  padding: 0.4rem 0.7rem;
  border: 1.5px solid #bdbdbd;
  border-radius: 6px;
  font-size: 1.1rem;
  background: #f7f7f7;
  color: #222;
  transition: border 0.2s, box-shadow 0.2s;
}

input[type="text"]:focus {
  border-color: #4CAF50;
  background: #fff;
  box-shadow: 0 2px 8px rgba(76,175,80,0.08);
  outline: none;
  color: #222;
}

input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #4CAF50;
  margin-right: 0.5rem;
}
</style> 