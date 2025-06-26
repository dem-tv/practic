<script setup lang="ts">
import type { NavItem } from '@/types/navigation.types';

import { ROUTE_NAME_ACCOUNTING } from '@/constants/routeNames';

const LIST_NAVIGATION: NavItem[] = [
  {
    title: 'Список проектов',
    to: { name: ROUTE_NAME_ACCOUNTING.PROJECT_LIST },
  },
  {
    title: 'Трудозатраты для бухгалтерии',
    to: { name: ROUTE_NAME_ACCOUNTING._2 },
  },
  {
    title: 'Трудозатраты для бухгалтерии в разрезе подразделений',
    to: { name: ROUTE_NAME_ACCOUNTING.BY_DEPARTMENTS },
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
