<script setup lang="ts">
import type { NavItem } from '@/types/navigation.types';

import { ROUTE_NAME_QMS } from '@/constants/routeNames';

const LIST_NAVIGATION: NavItem[] = [
  {
    title: 'Анализ внутренних возвратов',
    to: { name: ROUTE_NAME_QMS.INTERNAL_TEST_ANALYSIS },
  },
  {
    title: 'Анализ тестирования',
    to: { name: ROUTE_NAME_QMS.TEST_ANALYSIS },
  },
  {
    title: 'Мониторинг исполнения заявок для оценки результативности',
    to: { name: ROUTE_NAME_QMS.APPLICATIONS_PERFORMANCE_EVALUATION },
  },
  {
    title: 'Результативность процесса ОП СМК (сопровождение)',
    to: { name: ROUTE_NAME_QMS.EFFECTIVENESS_PROCESS },
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
