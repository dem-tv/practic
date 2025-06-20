<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
</script>

<template>
  <VerticalList :items="list">
    <template #item="{ item }">
      <span class="cell-list-vertical-item">{{ item }}</span>
    </template>
  </VerticalList>
</template>

<style lang="scss" src="./CellListVertical.scss"></style>
