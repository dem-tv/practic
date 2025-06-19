<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';
import type { Type } from '@/types/applicationType.types';

import {
    DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
    DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList, applicationTypes } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_APPLICATION_TYPE = 'Тип заявки';
const LABEL_PROJECT = 'Проекты';

type FromModel = {
    period: DateModel;
    application: Type | null;
    project: null;
};

const formModel = ref<FromModel>({
    period: null,
    application: null,
    project: null,
});

const validationRules = computed(() => ({
    period: {
        required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
    },
    application: {
        required: helpers.withMessage(getMessageRequired(LABEL_APPLICATION_TYPE), required),
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

function onSelectApplication(checked: boolean, option: Type) {
    if (!checked) return;
    formModel.value.application = option;
    return formModel.value.application;
}
</script>

<template>
    <TitledContent
        :link-to-back="{ name: ROUTE_NAME_MAIN }"
        title="Мониторинг исполнения заявок для оценки результативности"
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
            :error-message="formValidation.application.errorMessage"
            :error="formValidation.application.invalid"
            :required="formValidation.application.required"
        >
            <OptionControl
                v-for="option in applicationTypes"
                @update:checked="onSelectApplication($event, option)"
                :key="option.id"
                inputType="checkbox"
                v-model="formModel.application"
                :value="option.id"
                :label="option.name"
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
            <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
        </HorizontalList>
        </BaseForm>
    </TitledContent>
</template>
