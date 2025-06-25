<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_DATE = 'Дата';
const LABEL_PROJECT = 'Проекты';

type FromModel = {
  period: DateModel;
  project: null;
};

const formModel = ref<FromModel>({
  period: null,
  project: null,
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_DATE), required),
  },
  project: {
    required: helpers.withMessage(getMessageRequired(LABEL_PROJECT), required),
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
    title="Неисполненные заявки на (оцененные и неоцененные)"
  >
    <BaseForm>
      <DatePeriod
        v-model="formModel.period"
        picker-type="point"
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        :label="LABEL_DATE"
        :error-message="formValidation.period.errorMessage"
        :error="formValidation.period.invalid"
        :required="formValidation.period.required"
        placeholder="Выберите дату"
        name="date"
      />
      <FieldWrapper
        :label="LABEL_PROJECT"
        :error-message="formValidation.project.errorMessage"
        :error="formValidation.project.invalid"
        :required="formValidation.project.required"
      >
        <BaseSelect
          v-model="formModel.project"
          multiple
          :options="exampleList"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
      <HorizontalList>
        <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
