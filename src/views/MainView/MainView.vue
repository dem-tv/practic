<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';

import {
  ROUTE_NAME_ACCOUNTING,
  ROUTE_NAME_LABOR_COSTS,
  ROUTE_NAME_QMS,
  ROUTE_NAME_SUPPORT,
} from '@/constants/routeNames';

type NavItem = {
  title: string;
  to: RouteLocationNamedRaw;
};

const NAVIGATION: NavItem[] = [
  {
    title: 'Сопровождение',
    to: {
      name: ROUTE_NAME_SUPPORT.MAIN,
    },
  },
  {
    title: 'СМК',
    to: {
      name: ROUTE_NAME_QMS.MAIN,
    },
  },
  {
    title: 'Трудозатраты',
    to: {
      name: ROUTE_NAME_LABOR_COSTS.MAIN,
    },
  },
  {
    title: 'Бухгалтерия',
    to: {
      name: ROUTE_NAME_ACCOUNTING.MAIN,
    },
  },
];
</script>

<template>
  <TitledContent title="Отчеты Redmine">
    <TabList>
      <TabListItem
        v-for="navItem in NAVIGATION"
        :key="navItem.title"
        :to="navItem.to"
      >
        {{ navItem.title }}
      </TabListItem>
    </TabList>
    <RouterView v-slot="{ Component }">
      <Transition
        name="fade"
        mode="out-in"
        appear
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </TitledContent>
</template>
