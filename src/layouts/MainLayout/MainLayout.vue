<script setup lang="ts"></script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <p>LOGO</p>
      <p>SEARCH</p>
    </header>
    <div class="main-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" src="./MainLayout.scss" />
