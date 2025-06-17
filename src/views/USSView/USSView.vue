<script setup lang="ts">
import type { DateModel } from '@/types/datePeriod.types';

import {
    DATE_FNS_FORMAT_ISO_WITH_TIMEZONE,
    DATE_FORMAT_ISO_WITH_TIMEZONE,
} from '@/constants/dates';
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

type FromModel = {
    period: DateModel;
};

const formModel = ref<FromModel>({
    period: null,
});

function onSubmit() {
    console.log(formModel.value);
}
</script>

<template>
    <TitledContent
    :link-to-back="{ name: ROUTE_NAME_MAIN }"
    title="Трудозатраты УЦС"
    >
    <BaseForm>
        <DatePeriod
        v-model="formModel.period"
        :format-date="DATE_FNS_FORMAT_ISO_WITH_TIMEZONE"
        :format-dayjs="DATE_FORMAT_ISO_WITH_TIMEZONE"
        label="Период"
        placeholder="Выберите период"
        name="date"
        />
        <HorizontalList>
        <BaseButton>Посмотреть</BaseButton>
        <BaseButton>Подготовить к загрузке</BaseButton>
        </HorizontalList>
    </BaseForm>
    </TitledContent>
</template>
