<script setup lang="ts">
import { QMSNavigation } from '@/constants/QMSNavigation';
</script>

<template>
  <VerticalList
    :items="QMSNavigation"
    key-field="title"
  >
    <template #item="{ item }">
      <ListLinkItem :to="item.to">{{ item.title }}</ListLinkItem>
    </template>
  </VerticalList>
</template>
