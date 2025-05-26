<script setup lang="ts">
import { ref } from 'vue';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const todos = ref<TodoItem[]>([
  { id: 1, text: 'Learn Vue 3', completed: false },
  { id: 2, text: 'Master TypeScript', completed: false },
  { id: 3, text: 'Build awesome apps', completed: false }
]);

const newTodo = ref<string>('');

const addTodo = (): void => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      completed: false
    });
    newTodo.value = '';
  }
};

const toggleTodo = (id: number): void => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
</script>

<template>
  <div class="v-for-example">
    <h2>v-for Directive Example</h2>
    
    <div class="todo-input">
      <!-- Common @keyup event modifiers:
           @keyup.enter - triggers on Enter key
           @keyup.esc - triggers on Escape key
           @keyup.space - triggers on Space key
           @keyup.tab - triggers on Tab key
           @keyup.delete - triggers on Delete key
           @keyup.up - triggers on Up arrow key
           @keyup.down - triggers on Down arrow key
           @keyup.left - triggers on Left arrow key
           @keyup.right - triggers on Right arrow key
           @keyup.ctrl - triggers when Ctrl key is pressed
           @keyup.alt - triggers when Alt key is pressed
           @keyup.shift - triggers when Shift key is pressed
           @keyup.meta - triggers when Command (Mac) or Windows key is pressed -->
      <input 
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Add new todo"
        type="text"
      >
      <button @click="addTodo">Add</button>
    </div>

    <ul class="todo-list">
      <!-- : (colon) is a shorthand for v-bind directive
           Vue: :key="todo.id" is equivalent to v-bind:key="todo.id"
           Vue: :class="{ completed: todo.completed }" is equivalent to v-bind:class="{ completed: todo.completed }"

           we have 2 types of binding:
           1. static binding:
              <div :class="className">
                <p>Static text</p>
                <p>Static text</p>
              </div>
           2. dynamic binding:
              <div :class="dynamicClass + ' ' + 'className'">
                <p>Dynamic text</p>
                <p>Dynamic text</p>
              </div>
           
           React equivalent:
           key={todo.id}
           className={`${todo.completed ? 'completed' : ''}`}
           or
           className={todo.completed ? 'completed' : ''}
           
           It's used to dynamically bind attributes or props to JavaScript expressions 
           
           
           
           Conditional classes:
           <div :class="{ 'completed': todo.completed }">
            <p>Dynamic text</p>
            <p>Dynamic text</p>
           </div>

           
           -->
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        :class="{ completed: todo.completed }"
        @click="toggleTodo(todo.id)"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.v-for-example {
  padding: 1rem;
  border: 1px solid #42b983;
  border-radius: 8px;
  margin: 1rem 0;
}

.todo-input {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #42b983;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3aa876;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #f8f8f8;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: #42b983;
}

.todo-list li:hover {
  background-color: #e8e8e8;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style> 