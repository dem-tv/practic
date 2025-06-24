<script setup lang="ts">
const props = defineProps({
  /**
   * Заголовок поля.
   */
  legend: {
    type: String,
    default: '',
  },

  /**
   * Указывает на наличие ошибки. Окрашивает контур чекбокса в красный.
   */
  error: {
    type: Boolean,
    default: false,
  },

  /**
   * Если указано - будет появляться сообщение об ошибке.
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

const hasErrorMessage = computed(() => props.errorMessage || slots.errorMessage);

const classes = computed(() => ({
  'fieldset--error': props.error,
  'fieldset--required': props.required,
}));

const labelClasses = computed(() => ({
  fieldset__label: true,
}));
</script>

<template>
  <fieldset
    class="fieldset"
    :class="classes"
  >
    <legend
      :class="labelClasses"
      class="fieldset__legend"
    >
      <slot name="legend">
        {{ props.legend }}
      </slot>
    </legend>
    <div class="fieldset__inner">
      <slot />
    </div>
    <div
      v-if="hasErrorMessage"
      class="fieldset__error"
    >
      <slot name="errorMessage">
        {{ props.errorMessage }}
      </slot>
    </div>
  </fieldset>
</template>

<style lang="scss" src="./BaseFieldset.scss"></style>
