<script setup lang="ts">
import { useToggle } from '@vueuse/core';

import { getDefaultPeriods } from '@/utils/getDefaultPeriods';

import type { DateModel, DateWithPeriodId, PeriodListItem } from '@/types/datePeriod.types';

import { DATE_FORMAT_PICKER, DATE_MONTH_FORMAT_PICKER, OTHER_PERIOD_ID } from '@/constants/dates';

import type DropDown from '@/components/DropDown/DropDown.vue';

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
   * Периоды в левой части календаря.
   * @default getDefaultPeriods
   */
  periods: {
    type: Array as PropType<PeriodListItem[]>,
    default: getDefaultPeriods,
  },

  /**
   * Формат для модели даты - date-fns format.
   */
  formatDate: {
    type: String,
    default: 'dd.MM.yyyy',
  },

  /**
   * Формат для периода, выбранного в левой части календаря.
   */
  formatDayjs: {
    type: String,
    default: 'DD.MM.YYYY',
  },

  /**
   * Определяет замещающий текст,
   * отображаемый при отсутствии выбранного пользователем значения.
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * Убирает дропдаун и блокирует поле.
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * Отображение выбора времени
   */
  timePicker: {
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
   * Отвечает за режим выбора даты: диапазон при `range` или конкретная при `point`
   */
  pickerType: {
    type: String as PropType<'range' | 'point'>,
    default: 'range',
  },

  /**
   * Блокирует выбор даты, идущей после указанной в свойстве.
   * Если monthPicker = true, дата должна быть указана на месяц больше
   */
  maxDate: {
    type: [Object, String] as PropType<Date | string>,
    default: undefined,
  },

  /**
   * Выбор только года и месяца.
   */
  monthPicker: {
    type: Boolean,
    default: false,
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
  'update:modelValue': [value: DateModel];
}>();

const CHIP_CLOSE_BTN_SELECTOR = '.chip__reset';
const periodData = ref<DateWithPeriodId>({
  value: null,
  id: OTHER_PERIOD_ID,
});

const activateBtn = ref();
const dropdown = ref<ComponentPublicInstance<typeof DropDown> | null>(null);

const [isDropdownOpened, toggleDropdown] = useToggle();

const ignore = computed(() => [CHIP_CLOSE_BTN_SELECTOR, activateBtn]);

const formatOutput = computed(() =>
  props.monthPicker ? DATE_MONTH_FORMAT_PICKER : DATE_FORMAT_PICKER,
);

const periodModel = computed<DateWithPeriodId>(() => {
  return {
    ...periodData.value,
    value: props.modelValue,
  };
});

const isRangePicker = computed(() => props.pickerType === 'range');

const onUpdateValue = (event: Partial<DateWithPeriodId>) => {
  if (event.value) {
    periodData.value.value = event.value;
    emit('update:modelValue', event.value);
  }

  if (event.id) {
    periodData.value.id = event.id;
  }
};

const onResetPicker = () => {
  emit('update:modelValue', null);
};

const onSelectDate = () => {
  if (activateBtn.value?.$el) {
    activateBtn.value.$el.focus();
  }
};

function onEscape(evt: Event) {
  if (isDropdownOpened.value) {
    evt.stopPropagation();
    toggleDropdown(false);
  }
}
</script>

<template>
  <DropDown
    ref="dropdown"
    :ignore="ignore"
    :show="isDropdownOpened"
    @close="toggleDropdown(false)"
    @keydown.esc="onEscape"
  >
    <template #activator>
      <DatePeriodActivator
        ref="activateBtn"
        :name="props.name"
        :active="isDropdownOpened"
        :disabled="props.disabled"
        :model-value="props.modelValue"
        :format-dayjs="props.formatDayjs"
        :placeholder="props.placeholder"
        :resettable="props.resettable"
        :format-output="formatOutput"
        :label="props.label"
        :label-visually-hidden="props.labelVisuallyHidden"
        :required="props.required"
        :error="props.error"
        :error-message="props.errorMessage"
        tabindex="0"
        @reset="onResetPicker"
        @click="toggleDropdown(!isDropdownOpened)"
        @keydown.enter="toggleDropdown(!isDropdownOpened)"
        @keydown.space.prevent="toggleDropdown(!isDropdownOpened)"
      />
    </template>
    <template
      v-if="!props.disabled"
      #dropdown
    >
      <DatePeriodDropdown
        :model-value="periodModel"
        :items="props.periods"
        :format-dayjs="props.formatDayjs"
        :format-date="props.formatDate"
        :time-picker="props.timePicker"
        :range="isRangePicker"
        :max-date="props.maxDate"
        :month-picker="props.monthPicker"
        @keydown.esc.prevent="toggleDropdown(false)"
        @hide="toggleDropdown(false)"
        @update:model-value="onUpdateValue"
        @select-range="onSelectDate"
      />
    </template>
  </DropDown>
</template>
