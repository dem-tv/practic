<script setup lang="ts">
import type { DateModel } from '@/types/datePeriod.types';
import type { User } from '@/types/example.types.ts';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList } from '@/constants/example.ts';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

type FromModel = {
  period: DateModel;
  groups: User | null;
};

const formModel = ref<FromModel>({
  period: null,
  groups: null,
});

function onSubmit() {
  console.log(formModel.value);
}
</script>

<template>
  <TitledContent
    :link-to-back="{ name: ROUTE_NAME_MAIN }"
    title="Отчет по сотрудникам управления, со статистикой по тружозатратам"
  >
    <BaseForm>
      <DatePeriod
        v-model="formModel.period"
        required
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        label="Период"
        placeholder="Выберите период"
        name="date"
      />
      <FieldWrapper label="Группы сотрудников">
        <BaseSelect
          v-model="formModel.groups"
          required
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
