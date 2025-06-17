<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const ACTIVE_CLASS_NAME = 'tab-button--active';

const props = defineProps({
  /**
   * Страница, на которую переадресовывает вкладка при помощи `router-link`.
   */
  to: {
    type: Object as PropType<RouteLocationRaw>,
    default: null,
  },

  /**
   * Если свойство указано — применяется стиль активного элемента списка.
   */
  active: {
    type: Boolean,
    default: false,
  },

  /**
   * Состояние заблокированного поля.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const link = computed(() => props.to || '');

const isLink = computed(() => !props.disabled && link.value);

const classNames = computed(() => ({
  [ACTIVE_CLASS_NAME]: props.active,
}));
</script>

<template>
  <NavLink
    v-if="isLink"
    :to="link"
    class="tab-button"
    :active-class="ACTIVE_CLASS_NAME"
  >
    <slot />
  </NavLink>
  <button
    v-else
    type="button"
    class="tab-button"
    :disabled="props.disabled"
    :class="classNames"
  >
    <slot />
  </button>
</template>

<style lang="scss" src="./TabButton.scss"></style>
