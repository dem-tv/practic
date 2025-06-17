<script setup lang="ts">
import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

const LABEL_PERIOD = "Период";

type FromModel = {
  period: DateModel;
};

const formModel = ref<FromModel>({
  period: null,
});

function onSubmit() {
  console.log(formModel.value);
}
</script>

<template>
  <TitledContent
    :link-to-back="{ name: ROUTE_NAME_MAIN }"
    title="Трудозатраты по проектам"
  >
    <BaseForm @click.prevent>
      <DatePeriod
        v-model="formModel.period"
        required
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        :label="LABEL_PERIOD"
        placeholder="Выберите период"
        name="date"
      />
      <HorizontalList>
        <BaseButton @click="onSubmit">Подготовить к загрузке</BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
