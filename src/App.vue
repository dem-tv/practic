<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <RouterView v-slot="{ Component }">
      <Transition
        name="fade"
        mode="out-in"
        appear
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </MainLayout>
</template>
