<template>
  <div class="app">
    <h1>Vue Todo App</h1>
    <TodoForm @add="addTodo" />
    <div class="filters">
      <button
        v-for="f in filters"
        :key="f"
        :class="{ active: filter === f }"
        @click="filter = f"
      >
        {{ f.charAt(0).toUpperCase() + f.slice(1) }}
      </button>
    </div>
    <div class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
        @edit="editTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TodoForm from './components/TodoForm.vue';
import TodoItem from './components/TodoItem.vue';
import { useTodoStore } from './stores/todoStore';
import type { TodoFilter } from './types/todo';

const filters: TodoFilter[] = ['all', 'active', 'completed'];

const {
  todos,
  filter,
  filteredTodos,
  loadTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo
} = useTodoStore();

onMounted(() => {
  loadTodos();
});
</script>

<style>
body {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}

.app {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem 2.5rem 2.5rem 2.5rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  position: relative;
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  opacity: 0.92;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filters button {
  padding: 0.6rem 2.2rem;
  border: none;
  background: #f3f3f3;
  color: #333;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(60,60,60,0.04);
  outline: none;
}

.filters button.active,
.filters button:hover {
  background: #4CAF50;
  color: #fff;
  box-shadow: 0 4px 16px rgba(76,175,80,0.10);
}

.todo-list {
  border-radius: 10px;
  background: #fafbfc;
  box-shadow: 0 2px 12px rgba(60,60,60,0.06);
  padding: 0.5rem 0;
}
</style>
