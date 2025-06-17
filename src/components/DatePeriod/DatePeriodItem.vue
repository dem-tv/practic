<script setup lang="ts">
import type { PropType } from 'vue';
import VueDatePicker, { type DatePickerInstance } from '@vuepic/vue-datepicker';

import { dayjs } from '@/utils/dayjs';

import type { DateModel } from '@/types/datePeriod.types';

const props = defineProps({
  /**
   * @model
   * Текущее значение даты.
   */
  value: {
    type: [String, Array, Object] as PropType<DateModel>,
    default: null,
  },

  /**
   * Формат для модели даты - date-fns format.
   */
  formatDate: {
    type: String,
    default: 'dd.MM.yyyy',
  },

  /**
   * tabIndex для контейнера датапикера.
   */
  tabIndex: {
    type: String,
    default: '1',
  },

  /**
   * Отображение выбора времени
   */
  timePicker: {
    type: Boolean,
    default: false,
  },

  /**
   * Выбор периода или конкретной даты
   */
  range: {
    type: Boolean,
    default: false,
  },

  /**
   * Блокирует выбор даты, идущей после указанной в свойстве.
   * Если monthPicker = true, дата должна быть указана на месяц больше
   */
  maxDate: {
    type: [Object, String] as PropType<Date | string>,
    default: null,
  },

  /**
   * Выбор только года и месяца.
   */
  monthPicker: {
    type: Boolean,
    default: false,
  },
});

const DP_MENU_SELECTOR = '.dp__menu';

const customPosition = () => ({ top: 0, left: 0 });

const picker = ref<DatePickerInstance>();

const config = {
  modeHeight: props.monthPicker ? 340 : undefined,
};

const disabledDates = computed<string[]>(() => {
  if (props.monthPicker && props.maxDate) {
    const date =
      typeof props.maxDate === 'object'
        ? dayjs(props.maxDate).format(props.formatDate)
        : props.maxDate;
    return [date];
  }
  return [];
});

onMounted(async () => {
  await nextTick();
  if (picker.value?.$el) {
    const pickerElement = picker.value.$el.querySelector(DP_MENU_SELECTOR) as HTMLDivElement | null;
    if (pickerElement) {
      pickerElement.setAttribute('tabindex', props.tabIndex);
    }
  }
});
</script>

<template>
  <VueDatePicker
    ref="picker"
    :model-value="props.value"
    :alt-position="customPosition"
    :inline="true"
    :enable-time-picker="props.timePicker"
    locale="ru"
    month-name-format="long"
    :model-type="props.formatDate"
    :hide-navigation="['month', 'year']"
    :auto-apply="true"
    :range="props.range"
    :max-date="props.maxDate"
    :month-picker="props.monthPicker"
    :config="config"
    :disabled-dates="disabledDates"
    v-bind="$attrs"
  >
    <template #day="{ day }">
      <span class="dp__cell-text">{{ day }}</span>
    </template>
    <template #clock-icon>Выбрать время</template>
    <template #calendar-icon>Выбрать</template>
  </VueDatePicker>
</template>
