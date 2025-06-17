<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    class="period-button"
    :class="{ 'period-button--active': active }"
  >
    <slot />
  </button>
</template>

<style lang="scss" src="./DatePeriodButton.scss"></style>
