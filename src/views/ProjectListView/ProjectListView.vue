
<script setup lang="ts">

import type { DateModel } from '@/types/datePeriod.types';
import type { User } from '@/types/example.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { statusList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

const LABEL_DATE_CREATE = 'Дата создания';
const LABEL_STATUS = 'Статус';
const LABEL_NAME_PROJECT = 'Наименование';

type FromModel = {
  status: User | null;
  nameProject: string;
  dateCreate: DateModel;
};

const formModel = ref<FromModel>({
  status: null,
  nameProject: ' ',
  dateCreate: null,
});

function onSubmit() {
  console.log(formModel.value);
}
</script>

<template>
  <TitledContent
    :link-to-back="{ name: ROUTE_NAME_MAIN }"
    title="Список проектов"
  >
    <BaseForm @click.prevent>
      <FieldWrapper
        :label="LABEL_STATUS"
      >
        <BaseSelect
          v-model="formModel.status"
          :options="statusList"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
      <BaseField
        :label="LABEL_NAME_PROJECT"
        v-model="formModel.nameProject"
      />
      <DatePeriod
      picker-type="point"
        v-model="formModel.dateCreate"
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        :label="LABEL_DATE_CREATE"
        placeholder="Выберите дату создания"
        name="date"
      />
      <HorizontalList>
        <BaseButton @click="onSubmit"> Посмотреть </BaseButton>
        <BaseButton @click="onSubmit"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
