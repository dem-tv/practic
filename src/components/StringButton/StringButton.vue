<script setup lang="ts">
import { type ButtonHTMLAttributes, computed, defineAsyncComponent, type PropType } from 'vue';

import NavLink from '@/components/NavLink/NavLink.vue';

const props = defineProps({
  /**
   * Свойство, отвечающее за атрибут type.
   */
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
  /**
   * Если свойство задано — компонент становится `router-link`.
   */
  to: {
    type: [String, Object],
    default: '',
  },

  /**
   * Если свойство задано — отображается иконка слева.
   */
  icon: {
    type: String as PropType<IconType>,
    default: '',
  },

  /**
   * Свойство, отвечающее за атрибут disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const componentName = computed(() => (props.to ? NavLink : 'button'));

const LazySvgIcon = defineAsyncComponent(() => import('@/components/SvgIcon/SvgIcon.vue'));
</script>

<template>
  <component
    :is="componentName"
    :type="props.to ? null : props.type"
    :to="props.to || null"
    :disabled="props.disabled || null"
    :aria-disabled="props.disabled || null"
    class="button-string"
  >
    <LazySvgIcon
      v-if="props.icon"
      :name="props.icon"
    />
    <slot />
  </component>
</template>

<style lang="scss" src="./StringButton.scss"></style>
