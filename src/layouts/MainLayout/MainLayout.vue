<script setup lang="ts">
import SearchPages from '@/components/SearchPages/SearchPages.vue';
</script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <p>LOGO</p>
      <SearchPages />
    </header>
    <div class="main-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" src="./MainLayout.scss" />
