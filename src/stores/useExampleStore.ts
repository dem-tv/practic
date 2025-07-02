import { defineStore } from 'pinia';

export const useExampleStore = defineStore('example', () => {
  const state = ref('');

  const uppercase = computed(() => state.value.toUpperCase());

  function setState(value: string) {
    state.value = value;
  }
  return {
    state,
    uppercase,
    setState,
  };
});
