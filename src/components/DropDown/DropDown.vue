<script setup lang="ts">
import { type MaybeElementRef, onClickOutside } from '@vueuse/core';

const props = defineProps({
  /**
   * Массив элементов, при нажатии на которые дропдаун не будет закрываться
   */
  ignore: {
    type: Array as PropType<Array<string | MaybeElementRef>>,
    default: () => [],
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  close: [];
}>();

const dropdownElement = ref<HTMLElement | null>(null);
const anchorElement = ref<HTMLElement | null>(null);

const unwatchClickOutside = onClickOutside(
  dropdownElement,
  () => {
    emit('close');
  },
  {
    ignore: props.ignore,
  },
);

onUnmounted(() => {
  if (unwatchClickOutside.stop) {
    unwatchClickOutside.stop();
  }
});
</script>

<template>
  <div
    ref="anchorElement"
    class="dropdown"
  >
    <slot name="activator" />

    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="props.show"
        ref="dropdownElement"
        class="dropdown__inner"
      >
        <slot name="dropdown" />
      </div>
    </transition>
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="props.show"
        class="modal-mobile-background"
      ></div>
    </transition>
  </div>
</template>

<style lang="scss" src="./DropDown.scss"></style>
