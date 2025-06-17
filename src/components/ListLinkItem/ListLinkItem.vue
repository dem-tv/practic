<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  /**
   * Страница, на которую переадресовывает по нажатии при помощи `NavLink`.
   */
  to: {
    type: Object as PropType<RouteLocationRaw | null>,
    default: null,
  },
});
</script>

<template>
  <NavLink
    v-if="props.to"
    class="list-link-item"
    active-class="list-link-item--active"
    :to="props.to"
  >
    <slot />
  </NavLink>
  <p
    v-else
    class="list-link-item"
  >
    <slot />
  </p>
</template>

<style lang="scss" src="./ListLinkItem.scss"></style>
