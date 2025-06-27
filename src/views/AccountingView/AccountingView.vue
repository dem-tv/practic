<script setup lang="ts">
import { accountingNavigation } from '@/constants/accountingNavigation';
</script>

<template>
  <VerticalList
    :items="accountingNavigation"
    key-field="title"
  >
    <template #item="{ item }">
      <ListLinkItem :to="item.to">{{ item.title }}</ListLinkItem>
    </template>
  </VerticalList>
</template>
