<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref<boolean>(true);

const toggleVisibility = (): void => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <div class="v-if-example">
    <h2>v-if Directive Example</h2>
    
    <div class="content">
      <button @click="toggleVisibility">
        {{ isVisible ? 'Hide' : 'Show' }} Content
      </button>
      
      <div v-if="isVisible" class="conditional-content">
        <p>This content is conditionally rendered using v-if</p>
        <p>When v-if is false, this element is completely removed from the DOM</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-if-example {
  padding: 1rem;
  border: 1px solid #42b983;
  border-radius: 8px;
  margin: 1rem 0;
}

.content {
  margin-top: 1rem;
}

.conditional-content {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 4px;
  color: #42b983;
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
</style> 