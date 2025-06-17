<script setup lang="ts">
import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';
import type { User } from '@/types/example.types.ts';
import { exampleList } from '@/constants/example.ts';

type FromModel = {
  period: DateModel;
  employee: User[];
};

const formModel = ref<FromModel>({
  period: null,
  employee: [],
});

function onSubmit() {
  console.log(formModel.value);
}
</script>

<template>
  <TitledContent
    :link-to-back="{ name: ROUTE_NAME_MAIN }"
    title="Трудозатраты отдела дизайна"
  >
    <BaseForm>
      <DatePeriod
        v-model="formModel.period"
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        label="Период"
        placeholder="Выберите период"
        name="date"
      />
      <FieldWrapper label="Сотрудник">
        <BaseSelect
          v-model="formModel.employee"
          multiple
          :options="exampleList"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
      <HorizontalList>
        <BaseButton>Посмотреть</BaseButton>
        <BaseButton>Подготовить к загрузке</BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
