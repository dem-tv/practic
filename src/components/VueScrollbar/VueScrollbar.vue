<script setup lang="ts">
import { useElementSize, watchDebounced } from '@vueuse/core';
import PerfectScrollbar from 'perfect-scrollbar';

type VueScrollbar = {
  options?: PerfectScrollbar.Options;
  tag?: keyof HTMLElementTagNameMap;
};

const props = defineProps<VueScrollbar>();

const scroll = ref<HTMLElement>();
const { width, height } = useElementSize(scroll);
let perfectScrollbar: PerfectScrollbar | null = null;

const componentTagName = computed(() => props.tag || 'div');

function setScrollbar() {
  if (scroll.value) {
    perfectScrollbar = new PerfectScrollbar(scroll.value, props.options);
    perfectScrollbar.update();
  }
}

function updateScrollbar() {
  if (perfectScrollbar) {
    perfectScrollbar.update();
  }
}

function destroyScrollbar() {
  if (perfectScrollbar) {
    perfectScrollbar.destroy();
    perfectScrollbar = null;
  }
}

function resetScrollbar() {
  destroyScrollbar();
  setScrollbar();
}

watch(() => props.options, resetScrollbar);

/**
 * Требуется для корректировки размера скроллбара при изменении размера блока.
 */
const debounceSettings = { debounce: 10, maxWait: 30 };
watchDebounced(width, resetScrollbar, debounceSettings);
watchDebounced(height, resetScrollbar, debounceSettings);

onMounted(setScrollbar);
onUpdated(updateScrollbar);
onUnmounted(destroyScrollbar);
</script>

<template>
  <component
    :is="componentTagName"
    ref="scroll"
  >
    <slot />
  </component>
</template>

<style src="perfect-scrollbar/css/perfect-scrollbar.css"></style>

<style lang="scss" src="./VueScrollbar.scss"></style>
