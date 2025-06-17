<script lang="ts" setup>
const props = defineProps({
  /**
   * Название поля, используется в качестве значения for для label.
   */
  name: {
    type: String,
    default: '',
  },
  /**
   *  Скрытие заголовка.
   */
  labelVisuallyHidden: {
    type: Boolean,
    default: false,
  },
  /**
   * Заголовок, если не задан в slot label, создается стандартный заголовок.
   */
  label: {
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

  /**
   * Указывает на наличие ошибки. Бордер и описание поля становятся красными.
   */
  error: {
    type: Boolean,
    default: false,
  },

  /**
   * Если указано - будет выведена ошибка.
   */
  errorMessage: {
    type: String,
    default: '',
  },
});

const classes = computed(() => ({
  'labeled-field__label': true,
  'labeled-field__label--required': props.required,
  'visually-hidden': props.labelVisuallyHidden,
}));
</script>

<template>
  <div class="labeled-field">
    <label
      :for="props.name"
      :class="classes"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
    </label>
    <slot name="field" />
  </div>
</template>

<style lang="scss" src="./LabeledField.scss"></style>
