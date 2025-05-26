<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  msg?: string;
}

withDefaults(defineProps<Props>(), {
  msg: 'Welcome to Your Vue.js + TypeScript App'
});

const count = ref<number>(0);

const increment = (): void => {
  count.value++;
};

const decrement = (): void => {
  count.value--;
};
</script>

<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener">Vue.js documentation</a>.
    </p>
    <div class="counter">
      <h2>Counter: {{ count }}</h2>
      <div class="counter-controls">
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hello-world {
  text-align: center;
  margin-top: 60px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

p {
  margin: 20px 0;
}

a {
  color: #42b983;
}

.counter {
  margin-top: 2rem;
}

.counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3aa876;
}
</style> 