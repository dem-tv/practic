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
const LABEL_DUE_DATE = 'Срок исполнения превышен';
const LABEL_PROJECT = 'Проекты';

type FromModel = {
  period: DateModel;
  dueDate: boolean;
  project: null;
};

const formModel = ref<FromModel>({
  period: null,
  dueDate: false,
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
    title="Контроль сроков исполнения заявок по сопровождению"
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
        placeholder="Выберите период"
        name="date"
      />
      <BaseFieldset>
        <OptionControl
          v-model:checked="formModel.dueDate"
          :label="LABEL_DUE_DATE"
          input-type="checkbox"
          label-position="right"
        />
      </BaseFieldset>
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
        <BaseButton @click="onShow"> Посмотреть </BaseButton>
        <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
