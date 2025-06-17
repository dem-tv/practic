<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps({
  /**
   * Класс, который будет применяться при активной ссылке.
   */
  activeClass: {
    type: String,
    default: '',
  },
  /**
   * Класс, который будет применяться, когда активная ссылка полностью совпадает с ссылкой в адресной строке.
   */
  exactActiveClass: {
    type: String,
    default: '',
  },
  /**
   * Маршрут, по которому должна переходить ссылка при нажатии на нее.
   */
  to: {
    type: Object as PropType<RouteLocationRaw | null>,
    default: null,
    required: true,
  },
});

const link = computed(() => props.to || '');

const { href, navigate, isActive, isExactActive } = useLink({
  to: link,
});

const classNames = computed(() => ({
  [props.activeClass]: isActive.value,
  [props.exactActiveClass]: isExactActive.value,
}));

// Предотвращение обновления роута по нажатию на активную ссылку
function onClick(e: MouseEvent) {
  if (isActive.value) {
    e.preventDefault();
    return;
  }

  navigate(e);
}
</script>

<template>
  <a
    :href="href"
    :class="classNames"
    @click.stop="onClick"
  >
    <slot />
  </a>
</template>
