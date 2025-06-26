<script setup lang="ts">
import type { NavItem } from '@/types/navigation.types';

import { ROUTE_NAME_LABOR_COSTS } from '@/constants/routeNames';

const LIST_NAVIGATION: NavItem[] = [
  {
    title: 'Трудозатраты',
    to: { name: ROUTE_NAME_LABOR_COSTS.DEPARTMENT },
  },
  {
    title: 'Трудозатраты УЦС',
    to: { name: ROUTE_NAME_LABOR_COSTS.USS },
  },
  {
    title: 'Отчет по сотрудникам управления, со статистикой по тружозатратам',
    to: { name: ROUTE_NAME_LABOR_COSTS.MANAGEMENT_EMPLOYEES },
  },
  {
    title: 'Трудозатраты отдела дизайна',
    to: { name: ROUTE_NAME_LABOR_COSTS.DESIGN },
  },
  {
    title: 'Трудозатраты по проектам',
    to: { name: ROUTE_NAME_LABOR_COSTS.PROJECT },
  },
  {
    title: 'Недооцененные задачи',
    to: { name: ROUTE_NAME_LABOR_COSTS.UNDERVALUED_ISSUES },
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
