<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { projectList, trackerList, typeRequestList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_PROJECTS = 'Проекты';
const LABEL_TRACKERS = 'Трекеры';
const LABEL_UGKPO = 'УГКПО';
const LABEL_TYPE_REQUEST = 'Тип заявки';

type FromModel = {
  period: DateModel;
  projects: string;
  trackers: string;
  tasks: boolean;
  requestType: string;
};

const formModel = ref<FromModel>({
  period: null,
  projects: '',
  trackers: '',
  tasks: false,
  requestType: '',
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  trackers: {
    required: helpers.withMessage(getMessageRequired(LABEL_TRACKERS), required),
  },
  requestType: {
    required: helpers.withMessage(getMessageRequired(LABEL_TYPE_REQUEST), required),
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
    title="Отчет по тестировщикам"
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
        :legend="LABEL_TYPE_REQUEST"
        :error-message="formValidation.requestType.errorMessage"
        :error="formValidation.requestType.invalid"
        :required="true"
      >
        <OptionControl
          v-for="option in typeRequestList"
          :key="option.id"
          :value="option.id"
          name="name"
          :label="option.name"
          input-type="radio"
          label-position="right"
          :error="formValidation.requestType.invalid"
          @update:checked="
            (checked) => {
              if (!checked) return;
              formModel.requestType = option;
            }
          "
        />
      </BaseFieldset>
      <FieldWrapper :label="LABEL_PROJECTS">
        <BaseSelect
          v-model="formModel.projects"
          multiple
          :options="projectList"
          placeholder="Выберите из списка"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
      <FieldWrapper
        :label="LABEL_TRACKERS"
        :error-message="formValidation.trackers.errorMessage"
        :error="formValidation.trackers.invalid"
        :required="formValidation.trackers.required"
      >
        <BaseSelect
          v-model="formModel.trackers"
          multiple
          :options="trackerList"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
      <BaseFieldset>
        <OptionControl
          v-model:checked="formModel.tasks"
          :label="LABEL_UGKPO"
          input-type="checkbox"
          label-position="right"
        />
      </BaseFieldset>
      <HorizontalList>
        <BaseButton @click="onShow"> Посмотреть </BaseButton>
        <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
