import { defineStore } from 'pinia';

export const getDataStore = defineStore('detData', () => {
    const name = 'Dan';
  const age = 25;
    const state = ref([name, age]);

  const getData = computed(() => {
   
  }));

  function setState(value: string) {
    state[0] = value;
  }
  return {
    state,
    uppercase,
    setState,
  };
});
