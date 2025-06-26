<script setup lang="ts">
import type { NavItem } from '@/types/navigation.types';

import { ROUTE_NAME_SUPPORT } from '@/constants/routeNames';

const LIST_NAVIGATION: NavItem[] = [
  {
    title: 'Анализ изменения статусов задач',
    to: { name: ROUTE_NAME_SUPPORT.ANALYSIS_TASK_STATUS_CHANGES },
  },
  {
    title: 'Выполненные заявки за период',
    to: { name: ROUTE_NAME_SUPPORT.DONE_TASKS_BY_PERIOD },
  },
  {
    title: 'Заявки в доп запросе на дату',
    to: { name: ROUTE_NAME_SUPPORT.EXTRA_TASKS_BY_DATE },
  },
  {
    title: 'Заявки на анализе',
    to: { name: ROUTE_NAME_SUPPORT.ANALYSIS_TASKS },
  },
  {
    title: 'Заявки, возвращенные и поступившие за один период',
    to: { name: ROUTE_NAME_SUPPORT.TASKS_RETURNED_AND_RECEIVED_FOR_ONE_PERIOD },
  },
  {
    title: 'Заявки, возвращенные и поступившие как неисполненные за один период',
    to: {
      name: ROUTE_NAME_SUPPORT.ANALYSIS_TASK_STATUS_CHANGESTASKS_RETURNED_AND_RECEIVED_AS_UNFULFILLED_FOR_ONE_PERIOD,
    },
  },
  {
    title: 'Заявки, возвращенные на доработку за период',
    to: { name: ROUTE_NAME_SUPPORT.TASKS_RETURNED_FOR_REVISION_BY_PERIOD },
  },
  {
    title: 'Заявки, направленные в доп запрос за период',
    to: { name: ROUTE_NAME_SUPPORT.TASKS_EXTRA_PERIOD },
  },
  {
    title: 'Контроль сроков исполнения заявок по сопровождению',
    to: { name: ROUTE_NAME_SUPPORT.DEADLINE_CONTROL_SUPPORT_TASKS_EXECUTION },
  },
  {
    title: 'Неисполненные заявки на',
    to: { name: ROUTE_NAME_SUPPORT.UNFULFILLED_REQUESTS_FOR },
  },
  {
    title: 'Неисполненные заявки на (оцененные и неоцененные)',
    to: { name: ROUTE_NAME_SUPPORT.UNFULFILLED_REQUESTS_ON_APPRECIATED_AND_UNAPPRECIATED },
  },
  {
    title: 'Акт по сопровождению (БИБ)',
    to: { name: ROUTE_NAME_SUPPORT.ACT_OF_SUPPORT_BIB },
  },
  {
    title: 'Заявки в доп запросе на дату',
    to: { name: ROUTE_NAME_SUPPORT.TASKS_EXTRA_BY_DATE },
  },
  {
    title: 'Отчет по тестировщикам',
    to: { name: ROUTE_NAME_SUPPORT.TESTING },
  },
  {
    title: 'Поступившие заявки за период',
    to: { name: ROUTE_NAME_SUPPORT.RECEIVED_TASKS_BY_PERIOD },
  },
];
</script>

<template>
  <VerticalList
    :items="LIST_NAVIGATION"
    key-field="title"
  >
    <template #item="{ item }">
      <ListLinkItem :to="item.to">{{ item.title }}</ListLinkItem>
    </template>
  </VerticalList>
</template>
