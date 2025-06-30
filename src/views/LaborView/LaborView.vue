<script setup lang="ts">
import { laborCostsNavigation } from '@/constants/laborCostsNavigation';
</script>

<template>
  <VerticalList
    :items="laborCostsNavigation"
    key-field="title"
  >
    <template #item="{ item }">
      <ListLinkItem :to="item.to">{{ item.title }}</ListLinkItem>
    </template>
  </VerticalList>
</template>
