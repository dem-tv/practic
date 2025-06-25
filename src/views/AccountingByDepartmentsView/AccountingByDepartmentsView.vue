<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { typeProjectsList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_TYPE_PROJECTS = 'Типы проектов';

type FromModel = {
  period: DateModel;
  typeProjects: string;
};

const formModel = ref<FromModel>({
  period: null,
  typeProjects: '',
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  typeProjects: {
   required: helpers.withMessage(getMessageRequired(LABEL_TYPE_PROJECTS), required),
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
    title="Трудозатраты для бухгалтерии"
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
        :label="LABEL_TYPE_PROJECTS"
        :error-message="formValidation.typeProjects.errorMessage"
        :error="formValidation.typeProjects.invalid"
        :required="formValidation.typeProjects.required"
      >
        <BaseSelect
          v-model="formModel.typeProjects"
          :options="typeProjectsList"
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
