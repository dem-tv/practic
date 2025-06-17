<script setup lang="ts">
import { type ButtonHTMLAttributes, computed, type PropType } from 'vue';

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
   * Свойство, отвечающее за атрибут disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Если свойство задано — отображается загрузка, а все остальные элементы кнопки скрываются.
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * При включении растягивает компонент на 100% ширины.
   */
  fluid: {
    type: Boolean,
    default: false,
  },
});

const componentName = computed(() => (props.to ? 'RouterLink' : 'button'));

const modifiers = computed(() => ({
  'button--loading': props.loading,
  'button--fluid': props.fluid,
}));

const isButtonDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <component
    :is="componentName"
    :type="props.to ? null : props.type"
    :to="props.to || null"
    :disabled="isButtonDisabled || null"
    :aria-disabled="props.disabled || null"
    :aria-busy="props.loading || null"
    class="button"
    :class="modifiers"
  >
    <slot />
  </component>
</template>

<style lang="scss" src="./BaseButton.scss"></style>
