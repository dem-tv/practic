<script setup lang="ts">
import { getFormattedDateLabel } from '@/utils/getFormattedDateLabel';

import type { DateModel } from '@/types/datePeriod.types';

import { DATE_FORMAT_PICKER, DATE_MONTH_FORMAT_PICKER } from '@/constants/dates';

const props = defineProps({
  /**
   * Имя элемента для которого используется лейбл
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * @model
   * Текущее значение даты.
   */
  modelValue: {
    type: [String, Object, Array] as PropType<DateModel>,
    default: null,
  },

  /**
   * Формат для периода, выбранного в левой части календаря.
   */
  formatDayjs: {
    type: String,
    default: 'DD.MM.YYYY',
  },

  /**
   * Формат для периода, выбранного в левой части календаря.
   */
  formatOutput: {
    type: String as PropType<typeof DATE_FORMAT_PICKER | typeof DATE_MONTH_FORMAT_PICKER>,
    default: DATE_FORMAT_PICKER,
  },

  /**
   * Определяет замещающий текст,
   * отображаемый при отсутствии выбранного пользователем значения.
   */
  placeholder: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Активность кнопки-активатора
   */
  active: {
    type: Boolean,
    default: false,
  },

  /**
   * Добавляет кнопку очистки в инпут.
   */
  resettable: {
    type: Boolean,
    default: true,
  },

  /**
   * Заголовок
   */
  label: {
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

const emit = defineEmits<{
  reset: [];
}>();

const preparedLabel = computed(() => {
  if (!props.modelValue || (Array.isArray(props.modelValue) && !props.modelValue.length)) {
    return null;
  }

  if (!Array.isArray(props.modelValue)) {
    return getFormattedDateLabel(props.modelValue, props.formatOutput);
  }

  const start = getFormattedDateLabel(props.modelValue[0], props.formatOutput);
  const end = getFormattedDateLabel(props.modelValue[1], props.formatOutput);

  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
});

const onClickReset = () => {
  emit('reset');
};
</script>

<template>
  <FieldWrapper
    :disabled="props.disabled"
    :name="props.name"
    :required="props.required"
    :error="props.error"
    :active="props.active"
    :error-message="props.errorMessage"
    :label-visually-hidden="props.labelVisuallyHidden"
    field-class="period-activator__field"
    :label="label"
  >
    <slot name="default">
      <BaseChip
        v-if="preparedLabel"
        :removable="props.resettable"
        :disabled="props.disabled"
        @click:remove="onClickReset"
      >
        {{ preparedLabel }}
      </BaseChip>
      <p
        v-else
        class="period-activator__placeholder"
      >
        {{ props.placeholder }}
      </p>
    </slot>
    <slot name="appendIcon">
      <SvgIcon
        name="calendar"
        class="period-activator__icon"
        :class="{ 'period-activator__icon--disabled': props.disabled }"
      />
    </slot>
  </FieldWrapper>
</template>

<style lang="scss" src="./DatePeriodActivator.scss"></style>
