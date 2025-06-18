<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired} from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = "Период";

type FromModel = {
  period: DateModel;
};

const formModel = ref<FromModel>({
  period: null,
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
}));

const { formValidation, validateForm } = useValidation(formModel, validationRules);

async function onPrepare() {
  const isValid = await validateForm();
  if (!isValid) return;

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
        :error-message="formValidation.period.errorMessage"
        :error="formValidation.period.invalid"
        :required="formValidation.period.required"
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        :label="LABEL_PERIOD"
        placeholder="Выберите период"
        name="date"
      />
      <HorizontalList>
        <BaseButton @click="onPrepare">Подготовить к загрузке</BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
