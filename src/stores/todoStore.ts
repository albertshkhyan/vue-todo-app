import { ref, computed } from 'vue';
import type { Todo, TodoFilter } from '../types/todo';

const STORAGE_KEY = 'vue-todo-app';

export const useTodoStore = () => {
  const todos = ref<Todo[]>([]);
  const filter = ref<TodoFilter>('all');

  const loadTodos = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      todos.value = JSON.parse(stored).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
  };

  const saveTodos = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
  };

  const addTodo = (text: string) => {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    });
    saveTodos();
  };

  const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
    }
  };

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id);
    saveTodos();
  };

  const editTodo = (id: number, text: string) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.text = text;
      saveTodos();
    }
  };

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed);
      case 'completed':
        return todos.value.filter(todo => todo.completed);
      default:
        return todos.value;
    }
  });

  return {
    todos,
    filter,
    filteredTodos,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo
  };
}; 