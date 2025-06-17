<script setup lang="ts">
import { ROUTE_NAME_MAIN } from '@/constants/routeNames';

const props = defineProps({
  showBack: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="titled-content">
    <StringButton
      v-if="props.showBack"
      :to="{ name: ROUTE_NAME_MAIN }"
      type="button"
    >
      <SvgIcon name="arrow" />
      Back
    </StringButton>
    <BaseTitle uppercase>
      {{ props.title }}
    </BaseTitle>
    <slot />
  </div>
</template>

<style src="./TheTitledContent.scss" lang="scss" />
