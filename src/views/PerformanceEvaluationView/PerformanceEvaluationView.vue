<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';

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
    requestType: {
        functional: boolean,
        accompaniment: boolean
    };
    project: null;
};

const formModel = ref<FromModel>({
    period: null,
    requestType: {
        functional: false,
        accompaniment: false
    },
    project: null,
});

const validationRules = computed(() => ({
    period: {
        required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
    },
    requestType: {
    required:
        helpers.withMessage(
        getMessageRequired(LABEL_APPLICATION_TYPE),
        () => {
            return (!!formModel.value.requestType.functional || !!formModel.value.requestType.accompaniment)
        }
        )
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
            :error-message="formValidation.requestType.errorMessage"
            :error="formValidation.requestType.invalid"
            :required="formValidation.requestType.required"
        >
            <OptionControl
                :key="applicationTypes[0].id"
                inputType="checkbox"
                v-model:checked="formModel.requestType.functional"
                :value="applicationTypes[0].id"
                :label="applicationTypes[0].name"
                label-position="right"
            />
            <OptionControl
                :key="applicationTypes[1].id"
                inputType="checkbox"
                v-model:checked="formModel.requestType.accompaniment"
                :value="applicationTypes[1].id"
                :label="applicationTypes[1].name"
                label-position="right"
            />
        </BaseFieldset>
        <p>{{formValidation.requestType.errorMessage}}</p>
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
