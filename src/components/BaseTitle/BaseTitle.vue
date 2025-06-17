<script setup lang="ts">
const props = defineProps({
  /**
   * Переводит текст в верхний регистр.
   */
  uppercase: {
    type: Boolean,
    default: false,
  },

  /**
   * Меняет тег заголовка.
   */
  headingName: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'h1',
    validator(value: string) {
      const validHeadings = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'label', 'legend']);
      return validHeadings.has(value);
    },
  },

  /**
   * Размер заголовка
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'large',
  },
});

const slots = defineSlots();

const isSimpleHeading = computed(() => {
  return !slots.tabs && !slots.buttons && !slots.status;
});
const modifiers = computed(() => ({
  [`title--${props.size}`]: props.size,
  'title--uppercase': props.uppercase,
}));
</script>

<template>
  <component
    :is="props.headingName"
    v-if="isSimpleHeading"
    tabindex="0"
    class="title"
    :class="modifiers"
  >
    <slot />
  </component>
</template>

<style lang="scss" src="./BaseTitle.scss"></style>
