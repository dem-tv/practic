<script setup lang="ts">
import type { NavItem } from '@/types/navigation.types';

import {
  ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
  ROUTE_NAME_MANAGEMENT_EMPLOYEES,
} from '@/constants/routeNames';

const LIST_NAVIGATION: NavItem[] = [
  {
    title: 'Трудозатраты',
    to: { name: ROUTE_NAME_LABOR_COSTS_DEPARTMENT },
  },
  {
    title: 'Отчет по сотрудникам управления, со статистикой по тружозатратам',
    to: { name: ROUTE_NAME_MANAGEMENT_EMPLOYEES },
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
