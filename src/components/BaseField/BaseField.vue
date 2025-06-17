<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  /**
   * Заголовок
   */
  label: {
    type: String,
    default: '',
  },

  /**
   * Имя поля
   */
  name: {
    type: String,
    default: '',
  },

  /**
   * Скрытие заголовка
   */
  labelVisuallyHidden: {
    type: Boolean,
    default: false,
  },

  /**
   * Если указано - бордер и описание поля становятся красными
   */
  error: {
    type: Boolean,
    default: false,
  },

  /**
   * Если указано - будет использовано вместо внутреннего сообщения об ошибке
   */
  errorMessage: {
    type: String,
    default: '',
  },

  /**
   * Описание
   */
  hint: {
    type: String,
    default: '',
  },

  /**
   * Если указано - поле не активно, меняет стилизацию
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Инпутмода элемента инпута
   */
  inputmode: {
    type: String as PropType<
      'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
    >,
    default: 'text',
  },

  /**
   * Тип элемента инпута
   */
  type: {
    type: String,
    default: 'text',
  },

  /**
   * Определяет замещающий текст,
   * отображаемый при отсутствии введённого пользователем значения.
   */
  placeholder: {
    type: String,
    default: undefined,
  },

  /**
   * Добавляет кнопку очистки (если имеется слот, он заменит кнопку очистки)
   * Кнопка отображается когда в инпут что-то введено
   */
  resettable: {
    type: Boolean,
    default: false,
  },

  /**
   * Добавляет звездочку для пометки обязательности.
   */
  required: {
    type: Boolean,
    default: false,
  },

  /**
   * Возвращает значение в верхнем регистре.
   */
  uppercase: {
    type: Boolean,
    default: false,
  },
});

/** @value */
const model = defineModel<string>({
  default: '',
});

const emit = defineEmits<{
  toastError: [value: string];
  keydown: [e: KeyboardEvent];
  change: [value: string];
}>();

const inputBody = ref<HTMLElement>();
const inputRef = ref<HTMLElement>();

const attrs = useAttrs();
const slots = useSlots();

const autocomplete = computed(() => (attrs.autocomplete as string) || 'off');

const hasAppendSlots = computed(() => Boolean(slots?.append || props.resettable));
const hasPrependSlots = computed(() => Boolean(slots?.prepend));

const hasTimeValue = computed(() => {
  return props.type === 'time' && model.value;
});

function onResetModel() {
  model.value = '';
}

function onChange() {
  emit('change', model.value);
}

function setInputBodyRef(wrapper) {
  inputBody.value = wrapper?.$el;
}

const LazySvgIcon = defineAsyncComponent(() => import('@/components/SvgIcon/SvgIcon.vue'));

defineExpose({
  inputEl: inputRef,
});
// todo: убрать disabled
</script>

<template>
  <FieldWrapper
    :ref="setInputBodyRef"
    :disabled="props.disabled"
    :name="props.name"
    :value="model"
    :label-visually-hidden="props.labelVisuallyHidden"
    :label="props.label"
    :error="props.error"
    :error-message="props.errorMessage"
    :hint="props.hint"
    :required="props.required"
  >
    <template
      v-if="hasPrependSlots"
      #prependIcon
    >
      <slot name="prepend" />
    </template>
    <template #default>
      <input
        :id="props.name"
        ref="inputRef"
        v-model="model"
        :name="props.name"
        :inputmode="props.inputmode"
        :aria-disabled="props.disabled"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :autocomplete="autocomplete"
        :type="props.type"
        :aria-required="props.required"
        :class="{
          'field__input--time': props.type === 'time',
          'field__input--time-filled': hasTimeValue,
        }"
        class="field__input"
        @change="onChange"
      />
    </template>
    <template
      v-if="hasAppendSlots"
      #appendIcon
    >
      <button
        v-if="props.resettable"
        v-show="!props.disabled && model"
        type="button"
        class="field__icon-button"
        @click="onResetModel"
      >
        <LazySvgIcon
          name="cross"
          class="field__icon-reset"
        />
      </button>
      <slot name="append" />
    </template>
  </FieldWrapper>
</template>

<style lang="scss" src="./BaseField.scss"></style>
