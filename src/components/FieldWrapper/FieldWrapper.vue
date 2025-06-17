<script lang="ts" setup>
import type { PropType } from 'vue';
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
          class="field-wrapper__icon field-wrapper__icon--prepend"
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
    <p
      v-if="props.errorMessage && props.error"
      class="field-wrapper__hint"
    >
      {{ props.errorMessage }}
    </p>
  </div>
</template>

<style lang="scss" src="./FieldWrapper.scss"></style>
