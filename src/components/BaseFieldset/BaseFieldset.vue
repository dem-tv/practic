<script setup lang="ts">
import { useTemplateRef } from 'vue';

const props = defineProps({
  /**
   * Имя поля для привязки label.
   */
  name: {
    type: String,
    default: '',
  },

  /**
   * Заголовок поля.
   */
  label: {
    type: String,
    default: '',
  },

  /**
   * Указывает на наличие ошибки. Бордер и описание поля становятся красными.
   */
  error: {
    type: Boolean,
    default: false,
  },

  /**
   * Если указано - будет использовано вместо внутреннего сообщения об ошибке.
   */
  errorMessage: {
    type: String,
    default: '',
  },

  /**
   * Добавляет звездочку для пометки обязательности.
   */
  required: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();

const hasAppendSlots = computed(() => Boolean(slots?.appendIcon));
const hasPrependSlots = computed(() => Boolean(slots?.prependIcon));
// const hasErrorMessage = computed(() => props.errorMessage || slots.errorMessage);

const classes = computed(() => ({
  'fieldset--error': props.error,
  'fieldset--required': props.required,
  'fieldset--append': hasAppendSlots.value,
  'fieldset--prepend': hasPrependSlots.value,
}));

const wrapper = useTemplateRef<HTMLElement>('wrapper');

const labelClasses = computed(() => ({
  fieldset__label: true,
}));

defineExpose({
  el: wrapper,
});
</script>

<template>
  <fieldset
    class="fieldset"
    :class="classes"
  >
    <legend
      :class="labelClasses"
      :for="props.name"
      class="fieldset__label"
    >
      {{ props.label }}
    </legend>
    <div class="fieldset__inner">
      <div class="fieldset__checkbox-group">
        <slot />
      </div>
    </div>
    <div class="fieldset__error-text">
      {{ props.errorMessage }}
    </div>
  </fieldset>
</template>

<style lang="scss" src="./BaseFieldset.scss"></style>
