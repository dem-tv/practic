<script setup lang="ts">
import { helpers, required, requiredIf } from '@vuelidate/validators';

import { getMessageRequired, getMessageRequiredIf } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { projectList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_PROJECTS = 'Проекты';

type FromModel = {
  period: DateModel;
  projects: string;
  tasks: boolean;
};

const formModel = ref<FromModel>({
  period: null,
  projects: '',
  tasks: false,
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  projects: {
    required: helpers.withMessage(getMessageRequired(LABEL_PROJECTS), required),
  },
  tasks: {
    required: helpers.withMessage("Галочка не поставленa", 
    requiredIf(() => !formModel.value.tasks)),
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
    title="Трудозатраты"
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
       <BaseFieldset
        :error-message="formValidation.tasks.errorMessage"
        :error="formValidation.tasks.invalid"
        :required="formValidation.tasks.required"
      >
        <OptionControl
          v-model:checked="formModel.tasks"
          label ="Только Белинвестбанк"
          inputType="checkbox"
          labelPosition = "right"
        />
      </BaseFieldset>
      <FieldWrapper
        :label="LABEL_PROJECTS"
        :error-message="formValidation.projects.errorMessage"
        :error="formValidation.projects.invalid"
        :required="formValidation.projects.required"
      >
        <BaseSelect
          v-model="formModel.projects"
          multiple
          :options="projectList"
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