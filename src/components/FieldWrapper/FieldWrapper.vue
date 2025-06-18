<script lang="ts" setup>
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
   * Если указано - поле не активно, меняет стилизацию.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Значение внутренней модели.
   */
  value: {
    type: [Object, String, Number, Boolean, Array, null],
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
   * Визуально скрывает заголовок, оставляя элемент в DOM.
   */
  labelVisuallyHidden: {
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
   * Если указано - будет использовано вместо внутреннего сообщения об ошибке.
   */
  errorMessage: {
    type: String,
    default: '',
  },

  /**
   * Описание или подсказка, размещается внизу компонента.
   */
  hint: {
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
   *  Список событий, на который происходит поднятие лейбла.
   */
  fieldClass: {
    type: String,
    default: '',
  },

  /**
   *  Добавляет стиль активности.
   */
  active: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();

const hasAppendSlots = computed(() => Boolean(slots?.appendIcon));
const hasPrependSlots = computed(() => Boolean(slots?.prependIcon));
const hasErrorMessage = computed(() => props.errorMessage || slots.errorMessage);
const hasHint = computed(() => props.hint || slots.hint);

const classes = computed(() => ({
  'field-wrapper--disabled': props.disabled,
  'field-wrapper--error': props.error,
  'field-wrapper--required': props.required,
  'field-wrapper--append': hasAppendSlots.value,
  'field-wrapper--prepend': hasPrependSlots.value,
  'field-wrapper--active': props.active,
}));

const wrapper = useTemplateRef<HTMLElement>('wrapper');

const labelClasses = computed(() => ({
  'field-wrapper__label': true,
  'visually-hidden': props.labelVisuallyHidden,
}));

defineExpose({
  el: wrapper,
});
</script>

<template>
  <div
    ref="wrapper"
    class="field-wrapper"
    :class="classes"
  >
    <label
      :class="labelClasses"
      :for="props.name"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
    </label>
    <slot name="field">
      <div
        class="field-wrapper__field"
        :class="props.fieldClass"
      >
        <div
          v-if="hasPrependSlots"
          class="field-wrapper__icon--prepend"
        >
          <slot name="prependIcon" />
        </div>
        <slot name="default" />
        <div
          v-if="hasAppendSlots"
          class="field-wrapper__icon--append"
        >
          <slot name="appendIcon" />
        </div>
      </div>
    </slot>
    <slot name="hint"> </slot>
    <p
      v-if="hasHint"
      class="field-wrapper__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </p>
    <p
      v-if="hasErrorMessage"
      class="field-wrapper__hint"
    >
      <slot name="errorMessage">
        <span class="field-wrapper__error-text">
          {{ props.errorMessage }}
        </span>
      </slot>
    </p>
  </div>
</template>

<style lang="scss" src="./FieldWrapper.scss"></style>
