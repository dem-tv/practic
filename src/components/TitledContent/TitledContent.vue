<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';

const props = defineProps({
  /**
   * Ссылка на предыдущую страницу.
   * Если указано, отрисовывает ссылку сверху страницы.
   */
  linkToBack: {
    type: Object as PropType<RouteLocationNamedRaw | null>,
    default: null,
  },
  /**
   * Заголовок страницы.
   */
  title: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="titled-content">
    <StringButton
      v-if="props.linkToBack"
      :to="props.linkToBack"
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

<style src="./TitledContent.scss" lang="scss" />
