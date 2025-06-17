<script setup lang="ts">
import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';
import type { User } from '@/types/example.types.ts';
import { exampleList } from '@/constants/example.ts';

const LABEL_PERIOD = "Период";
const LABEL_EMPLOYEE = "Сотрудник";
const LABEL_NAME = "name";

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
        required
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        :label="LABEL_PERIOD"
        placeholder="Выберите период"
        name="date"
      />
      <FieldWrapper :label="LABEL_EMPLOYEE">
        <BaseSelect
          v-model="formModel.employee"
          required
          multiple
          :options="exampleList"
          track-by="id"
          :label="LABEL_NAME"
        />
      </FieldWrapper>
      <HorizontalList>
        <BaseButton>Посмотреть</BaseButton>
        <BaseButton>Подготовить к загрузке</BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
