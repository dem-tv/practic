<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';

import { getMessageRequired, getBannedValueMessage } from '@/utils/getMessage';

import type { DateModel } from '@/types/datePeriod.types';
import type { User } from '@/types/example.types';

import {
    DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
    DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { exampleList } from '@/constants/example';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

import { useValidation } from '@/composable/useValidation';

const LABEL_PERIOD = 'Период';
const LABEL_AMOUNT_OF_PENALTIES = 'Сумма штрафных санкций';
const LABEL_AMOUNT_FOR_SUPPORT = 'Сумма по сопровождению';
const LABEL_COMPLAINTS_NUMBER = 'Количество рекламаций';
const LABEL_PROJECT = 'Проекты';

type FromModel = {
    period: DateModel;
    penalties: User | null;
    support: User[];
    complaints: null;
    project: null;
};

const formModel = ref<FromModel>({
    period: null,
    penalties: null,
    support: [],
    complaints: null,
    project: null,
});

const validationRules = computed(() => ({
    period: {
        required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
    },
    penalties: {
        required: helpers.withMessage(getBannedValueMessage(LABEL_PERIOD), required),
    },
    support: {
        required: helpers.withMessage(getBannedValueMessage(LABEL_PERIOD), required),
    },
    project: {
        required: helpers.withMessage(getMessageRequired(LABEL_PERIOD), required),
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
        title="Результативность процесса ОП СМК (сопровождение)"
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
        <BaseField
            type="number"
            :label="LABEL_AMOUNT_OF_PENALTIES"
            :error-message="formValidation.penalties.errorMessage"
            :error="formValidation.penalties.invalid"
            :required="formValidation.penalties.required"
            placeholder="0.00"
        />
        <BaseField
            type="number"
            :label="LABEL_AMOUNT_FOR_SUPPORT"
            :error-message="formValidation.support.errorMessage"
            :error="formValidation.support.invalid"
            :required="formValidation.support.required"
            placeholder="0.00"
        />
        <BaseField
            type="number"
            :label="LABEL_COMPLAINTS_NUMBER"
            :error-message="formValidation.complaints.errorMessage"
            :error="formValidation.complaints.invalid"
            :required="formValidation.complaints.required"
            placeholder="0"
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
            <BaseButton @click="onShow"> Посмотреть </BaseButton>
            <BaseButton @click="onPrepare"> Подготовить к загрузке </BaseButton>
        </HorizontalList>
        </BaseForm>
    </TitledContent>
</template>
