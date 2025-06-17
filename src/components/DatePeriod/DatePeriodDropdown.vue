<script setup lang="ts">
import type { PropType } from 'vue';

import { dayjs } from '@/utils/dayjs';
import { getDateMaxTime } from '@/utils/getDateMaxTime';
import { getDateNullTime } from '@/utils/getDateNullTime';

import type { DateModel, DateWithPeriodId, PeriodListItem } from '@/types/datePeriod.types';

import { OTHER_PERIOD_ID } from '@/constants/dates';

const TIME_FORMAT = 'HH:mm';
const INDEX_FROM = 0;
const INDEX_TO = 1;

const props = defineProps({
  /**
   * Периоды в левой части календаря.
   * utils/getDefaultPeriods
   */
  items: {
    type: Array as PropType<PeriodListItem[]>,
    required: true,
  },

  /**
   * @model
   * Текущее значение даты.
   */
  modelValue: {
    type: [String, Object, Array] as PropType<DateWithPeriodId>,
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
   * Формат для периода, выбранного в левой части календаря.
   */
  formatDayjs: {
    type: String,
    default: 'DD.MM.YYYY',
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

const emit = defineEmits<{
  hide: [];
  'select-range': [];
  'update:modelValue': [value: Partial<DateWithPeriodId>];
}>();

const datePickerModel = ref<DateWithPeriodId>({
  value: null,
  id: OTHER_PERIOD_ID,
});

const timeFrom = ref<string>('');
const timeTo = ref<string>('');

const isOtherPeriod = computed(() => datePickerModel.value.id === OTHER_PERIOD_ID);

const dateFrom = computed(() => {
  return Array.isArray(datePickerModel.value.value) ? datePickerModel.value.value[INDEX_FROM] : '';
});
const dateTo = computed(() => {
  return Array.isArray(datePickerModel.value.value) ? datePickerModel.value.value[INDEX_TO] : '';
});

function getTime(date: string) {
  return dayjs(date, props.formatDayjs).format(TIME_FORMAT);
}
function getDateNewTime(date: string, timeRaw: string) {
  const time = dayjs(timeRaw, TIME_FORMAT);

  return dayjs(date, props.formatDayjs)
    .set('hour', time.get('hour'))
    .set('minute', time.get('minute'))
    .format(props.formatDayjs);
}

function onClickItem(item: PeriodListItem | typeof OTHER_PERIOD_ID) {
  if (item === OTHER_PERIOD_ID) {
    datePickerModel.value.id = item;

    if (!props.timePicker) {
      emit('update:modelValue', datePickerModel.value);
    }
    return;
  }

  const itemDate =
    (typeof item.value === 'function' ? item.value(props.formatDayjs) : item.value) ?? '';

  datePickerModel.value.id = item.id;
  datePickerModel.value.value = itemDate;

  if (!props.timePicker) {
    emit('update:modelValue', datePickerModel.value);
  }
}

function onStartSelectRange(value: Date) {
  datePickerModel.value.id = OTHER_PERIOD_ID;
  datePickerModel.value.value = [
    getDateNullTime(dayjs(value).format(props.formatDayjs), props.formatDayjs),
    '',
  ];

  if (props.timePicker) {
    return;
  }

  emit('update:modelValue', {
    id: OTHER_PERIOD_ID,
  });
}

function submit() {
  if (!datePickerModel.value.value) {
    emit('hide');
    return;
  }

  if (!props.timePicker && Array.isArray(datePickerModel.value.value)) {
    let [from, to] = datePickerModel.value.value;
    from = getDateNullTime(from, props.formatDayjs);
    to = getDateMaxTime(to, props.formatDayjs);
    datePickerModel.value.value = [from, to];
  }

  emit('update:modelValue', datePickerModel.value);
  emit('hide');
  emit('select-range');
}

function onUpdateValue(event: DateModel) {
  if (event !== null && timeFrom && !!timeTo && Array.isArray(event)) {
    const [from, to] = event;

    datePickerModel.value.value = [from, getDateMaxTime(to, props.formatDayjs)];
  } else {
    datePickerModel.value.value = event;
  }

  if (props.timePicker) {
    return;
  }

  submit();
}

watch(
  () => props.modelValue,
  () => {
    const periodId = props.modelValue?.value ? props.modelValue.id : OTHER_PERIOD_ID;
    datePickerModel.value = {
      ...props.modelValue,
      id: periodId,
    };
  },
  { immediate: true },
);

watch(
  datePickerModel.value,
  ({ value }) => {
    if (value) {
      timeFrom.value = value[INDEX_FROM] && getTime(value[INDEX_FROM]);
      timeTo.value = value[INDEX_TO] && getTime(value[INDEX_TO]);
    }
  },
  { immediate: true },
);

watch(timeFrom, (newValue) => {
  if (!Array.isArray(datePickerModel.value.value)) {
    return;
  }

  if (!newValue) {
    datePickerModel.value.value[INDEX_FROM] = getDateNullTime(dateFrom.value, props.formatDayjs);
    return;
  }

  datePickerModel.value.value[INDEX_FROM] = getDateNewTime(dateFrom.value, newValue);
});

watch(timeTo, (newValue) => {
  if (!Array.isArray(datePickerModel.value.value)) {
    return;
  }

  if (!newValue && dateTo.value) {
    datePickerModel.value.value[INDEX_TO] = getDateNullTime(dateTo.value, props.formatDayjs);
    return;
  }

  if (dateFrom.value && !dateTo.value && newValue) {
    datePickerModel.value.value[INDEX_TO] = getDateNewTime(dateFrom.value, newValue);
    return;
  }

  if (!dateTo.value) {
    return;
  }

  datePickerModel.value.value[INDEX_TO] = getDateNewTime(dateTo.value, newValue);
});
</script>

<template>
  <div class="period-dropdown">
    <div
      v-if="props.range"
      class="period-dropdown__block period-dropdown__block--menu"
    >
      <ul class="period-dropdown__list">
        <li
          v-for="item in items"
          :key="item.id"
          class="period-dropdown__item"
        >
          <DatePeriodButton
            :active="item.id === datePickerModel.id"
            @click="onClickItem(item)"
          >
            {{ item.label }}
          </DatePeriodButton>
        </li>
        <li class="period-dropdown__item">
          <DatePeriodButton
            :active="isOtherPeriod"
            @click="onClickItem(OTHER_PERIOD_ID)"
          >
            Выбрать период
          </DatePeriodButton>
        </li>
      </ul>
    </div>
    <div class="period-dropdown__block">
      <div class="period-dropdown__date">
        <DatePeriodItem
          :value="datePickerModel.value"
          :format-date="props.formatDate"
          :range="props.range"
          :max-date="props.maxDate"
          :month-picker="props.monthPicker"
          @range-start="onStartSelectRange"
          @update:model-value="onUpdateValue"
        />
        <div v-if="$props.timePicker">
          <div class="period-dropdown__time">
            <BaseField
              v-model="timeFrom"
              type="time"
              label="Время от"
              label-visually-hidden
              placeholder="Время от"
            />
            <BaseField
              v-model="timeTo"
              type="time"
              label="Время до"
              placeholder="Время от"
              label-visually-hidden
            />
          </div>
          <div class="period-dropdown__submit">
            <BaseButton
              theme="secondary"
              class="period-dropdown__submit-button"
              @click="submit"
            >
              Сохранить
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./DatePeriodDropdown.scss"></style>
