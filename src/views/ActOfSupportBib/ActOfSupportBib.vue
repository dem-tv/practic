<script setup lang="ts">
import { helpers, required, requiredIf } from '@vuelidate/validators';

import { getBannedValueMessage, getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_COST = 'Стоимость н/ч';

type FromModel = {
  period: DateModel;
  cost: number;
};

const formModel = ref<FromModel>({
  period: null,
  cost: null,
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  cost: {
    required: helpers.withMessage(getBannedValueMessage(LABEL_COST), () => {
      return Number(formModel.value.cost) !== 0 && formModel.value.cost;
    }),
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
    title="Акт по сопровождению (БИБ)"
  >
    <BaseForm>
      <DatePeriod
        v-model="formModel.period"
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        :label="LABEL_PERIOD"
        :error-message="formValidation.period.errorMessage"
        :error="formValidation.period.invalid"
        :required="formValidation.period.required"
        placeholder="Выберите период"
        name="date"
      />
      <BaseField
        v-model="formModel.cost"
        inputmode="numeric"
        :label="LABEL_COST"
        :error-message="formValidation.cost.errorMessage"
        :error="formValidation.cost.invalid"
        :required="formValidation.cost.required"
        placeholder="0.00"
      />
      <HorizontalList>
        <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
