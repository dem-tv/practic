<script setup lang="ts">
import { helpers, required, requiredIf } from '@vuelidate/validators';

import { getMessageRequired, getMessageRequiredIf } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';
import type { User } from '@/types/example.types';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList, projectsList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';
import { useExampleStore } from '@/stores/useExampleStore';

const exampleStore = useExampleStore();

const LABEL_PERIOD = 'Период';
const LABEL_GROUPS = 'Группы сотрудников';
const LABEL_EMPLOYEE = 'Сотрудник';
const LABEL_TYPE_REQUEST = 'Тип заявки';
const LABEL_PROJECTS = 'Проекты';

const ERROR_MESSAGE = 'Error request message';

type FromModel = {
  period: DateModel;
  groups: User | null;
  projects: string;
  employee: User[];
  requestType: {
    func: boolean;
    support: boolean;
  };
};

const formModel = ref<FromModel>({
  period: null,
  groups: null,
  projects: '',
  employee: [],
  requestType: {
    func: false,
    support: false,
  },
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  projects: {
    required: helpers.withMessage(getMessageRequired(LABEL_PROJECTS), required),
  },
  groups: {
    required: helpers.withMessage(
      getMessageRequiredIf(LABEL_GROUPS, LABEL_EMPLOYEE),
      requiredIf(
        () =>
          !formModel.value.employee.length ||
          (!formModel.value.employee.length && !formModel.value.groups),
      ),
    ),
  },
  employee: {
    required: helpers.withMessage(
      getMessageRequiredIf(LABEL_EMPLOYEE, LABEL_GROUPS),
      requiredIf(
        () =>
          !formModel.value.groups || (!formModel.value.employee.length && !formModel.value.groups),
      ),
    ),
  },
  requestType: {
    required: helpers.withMessage(ERROR_MESSAGE, () => {
      return !!formModel.value.requestType.func || !!formModel.value.requestType.support;
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
    title="Анализ изменения статусов задач"
  >
    <input
      type="text"
      @change="exampleStore.setState($event.target?.value || '')"
    />
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
            input-type="checkbox"
            label-position="right"
          />
          <OptionControl
            v-model:checked="formModel.requestType.support"
            label="Сопровождение"
            input-type="checkbox"
            label-position="right"
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
      <FieldWrapper
        :label="LABEL_GROUPS"
        :error-message="formValidation.groups.errorMessage"
        :error="formValidation.groups.invalid"
        :required="formValidation.groups.required"
      >
        <BaseSelect
          v-model="formModel.groups"
          :options="exampleList"
          track-by="id"
          label="name"
        />
      </FieldWrapper>
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
        <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
