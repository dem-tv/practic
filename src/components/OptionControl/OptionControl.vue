<script setup lang="ts">
const props = defineProps({
  /**
   * Заголовок инпута.
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * Подзаголовок инпута, дополнительное описание.
   */
  description: {
    type: String,
    default: '',
  },

  /**
   * Если свойство указано — лейбл становится визуально скрытым.
   */
  labelVisuallyHidden: {
    type: Boolean,
    default: false,
  },

  /**
   * Тип инпута, которым становится компонент;
   * toggle станет так же чекбоксом, но со специальным оформлением.
   */
  inputType: {
    type: String as PropType<'toggle' | 'checkbox' | 'radio'>,
    validator(value: string) {
      return ['toggle', 'checkbox', 'radio'].indexOf(value) !== -1;
    },
    default: 'toggle',
  },

  /**
   * Атрибут `name` инпута.
   */
  name: {
    type: String,
    default: '',
  },

  /**
   * Атрибут `value` инпута.
   */
  value: {
    type: [String, Number, Boolean],
    default: '',
  },

  /**
   * @model Состояние активности, атрибут `checked` инпута
   */
  checked: {
    type: [Boolean],
    default: false,
  },

  /**
   * Если свойство указано — инпут недоступен для изменения состояния.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Отображает лоадер
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * Если свойство задано, инпут окрашивается в красный.
   */
  error: {
    type: Boolean,
    default: false,
  },

  /**
   * Если свойство указано, текст отображается справа
   */
  labelPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },

  /**
   * Стиль label чекбокса
   */
  labelStyle: {
    type: String as PropType<'normal' | 'bold'>,
    default: 'normal',
  },

  /**
   * Если свойство указано — ширина элемента подстраивается
   * под размер содержимого (текста), иначе — `100%`.
   */
  dense: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:checked': [value: boolean];
}>();

const type = computed(() => {
  return props.inputType === 'toggle' ? 'checkbox' : props.inputType;
});

const classNames = computed(() => {
  return {
    'control--disabled': props.disabled,
    'control--loading': props.loading,
    'control--error': props.error,
    'control--text-right': props.labelPosition === 'right',
    'control--text-bold': props.labelStyle === 'bold',
    'control--dense': props.dense,
  };
});

function onChange(event: Event) {
  const { checked } = event.target as HTMLInputElement;
  emit('update:checked', checked);
}

function onPressEnter() {
  emit('update:checked', !props.checked);
}
</script>

<template>
  <label
    class="control"
    :class="classNames"
  >
    <span
      v-if="props.description"
      :class="props.labelVisuallyHidden ? 'visually-hidden' : 'control__head'"
    >
      <span class="control__title">
        {{ props.label }}
      </span>
      <span class="control__subtitle">
        {{ props.description }}
      </span>
    </span>
    <span
      v-else
      :class="props.labelVisuallyHidden ? 'visually-hidden' : 'control__title'"
    >
      {{ props.label }}
    </span>
    <span class="control__btn">
      <input
        :type="type"
        class="control__input"
        :class="`control__input--${props.inputType}`"
        :name="props.name"
        :value="props.value"
        :checked="props.checked"
        :disabled="props.disabled"
        @change="onChange"
        @keypress.enter="onPressEnter"
      />
      <span class="control__check-mark"></span>
    </span>
  </label>
</template>

<style lang="scss" src="./OptionControl.scss"></style>
