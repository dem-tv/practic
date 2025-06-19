<script setup lang="ts">
import { helpers, required, requiredIf } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';


import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { projectsList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_TYPE_REQUEST = 'Тип заявки';
const LABEL_PROJECTS = 'Проекты';

const ERROR_MESSAGE = 'Error request message';

type FromModel = {
  period: DateModel;
  projects: string;
  requestType: {
    func: boolean,
    support: boolean
  }
};

const formModel = ref<FromModel>({
  period: null,
  projects: '',
  requestType: {
    func: false,
    support: false
  }
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  projects:{
     required: helpers.withMessage(getMessageRequired(LABEL_PROJECTS), required),
  },
  requestType: { 
    required: helpers.withMessage(
      ERROR_MESSAGE,
      requiredIf(
        () =>
          !formModel.value.requestType.func && !formModel.value.requestType.support,
      ),
    ),
  }
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
    title="Выполненные заявки за период"
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
      :label="LABEL_TYPE_REQUEST"
      :error-message="formValidation.requestType.errorMessage"
      :error="formValidation.requestType.invalid"
      :required="formValidation.requestType.required"
      >
      <BaseFieldset>
        <OptionControl
          v-model:checked="formModel.requestType.func"
          label="Фунциональное развитие"
          inputType="checkbox"
          labelPosition = "right"
        />
        <OptionControl
          v-model:checked="formModel.requestType.support"
          label="Сопровождение"
          inputType="checkbox"
          labelPosition = "right"
        />
      </BaseFieldset>
      </FieldWrapper>
      <FieldWrapper
        :label="LABEL_PROJECTS"
        :error-message="formValidation.projects.errorMessage"
        :error="formValidation.projects.invalid"
        :required="formValidation.projects.required"
      >
        <BaseSelect
          v-model="formModel.projects"
          :options="projectsList"
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