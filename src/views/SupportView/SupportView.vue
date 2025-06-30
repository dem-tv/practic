<script setup lang="ts">
import { supportNavigation } from '@/constants/supportNavigation';
</script>

<template>
  <VerticalList
    :items="supportNavigation"
    key-field="title"
  >
    <template #item="{ item }">
      <ListLinkItem :to="item.to">{{ item.title }}</ListLinkItem>
    </template>
  </VerticalList>
</template>
