<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';
import type { User } from '@/types/example.types.ts';

import {
  DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
  DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList } from '@/constants/example.ts';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';
import { group } from 'console';

const LABEL_PERIOD="Период"
const LABEL_GROUPS="Группы сотрудников"

type FromModel = {
  period: DateModel;
  groups: User | null;
};

const formModel = ref<FromModel>({
  period: null,
  groups: null,
});

const validationRules = computed(() => ({
  period: {
    required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
  },
  groups: {
    required: helpers.withMessage(getMessageRequired(LABEL_GROUPS), required),
  },
}))

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
    title="Отчет по сотрудникам управления, со статистикой по тружозатратам"
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
      <HorizontalList>
        <BaseButton @click="onShow"> Посмотреть </BaseButton>
        <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
      </HorizontalList>
    </BaseForm>
  </TitledContent>
</template>
