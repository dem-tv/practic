<script setup lang="ts">
import { helpers, required, requiredIf } from '@vuelidate/validators';

import { getMessageRequired, getMessageRequiredIf } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';
import type { User } from '@/types/example.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = "Период";
const LABEL_EMPLOYEE = "Сотрудник";

type FromModel = {
  period: DateModel;
  employee: User[];
};

const formModel = ref<FromModel>({
  period: null,
  employee: [],
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  employee: {
    required: helpers.withMessage(getMessageRequired(LABEL_EMPLOYEE), required),
  },
}));

const { formValidation, validateForm } = useValidation(formModel, validationRules);

async function onShow() {
  const isValid = await validateForm();
  if (!isValid) return;

  console.log(formModel.value);
}

async function onPrepare() {
  const isValid = await validateForm();
  if (!isValid) return;

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
        :label="LABEL_PERIOD"
        :error-message="formValidation.period.errorMessage"
        :error="formValidation.period.invalid"
        :required="formValidation.period.required"
        placeholder="Выберите период"
        name="date"
      />
      <FieldWrapper 
      :label="LABEL_EMPLOYEE"
      :error-message="formValidation.employee.errorMessage"
      :error="formValidation.employee.invalid"
      :required="formValidation.employee.required"
      >
        <BaseSelect
          v-model="formModel.employee"
          multiple
          :options="exampleList"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
      <HorizontalList>
        <BaseButton @click="onShow">Посмотреть</BaseButton>
        <BaseButton @click="onPrepare">Подготовить к загрузке</BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
