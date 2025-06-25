<script setup lang="ts">
import type { GlobalComponents } from 'vue';

const props = defineProps({
  /**
   * Название компонента или HTML-элемент `span`/`p`, которым станет обёртка.
   *
   * Если задано строковое значение `icon` — применится компонент `SvgIcon`.
   * Если задано значение null — обертки не будет.
   */
  component: {
    type: String as PropType<keyof GlobalComponents | 'span' | 'p' | null>,
    default: 'span',
  },

  /**
   * Аргументы, которые будут переданы в компонент в качестве пропсов.
   *
   * Например, при `props.component === 'SvgIcon'` доступен аргумент
   * `name` (название иконки).
   */
  arguments: {
    type: Object as PropType<Record<string, unknown>>,
    default: null,
  },

  /**
   * Текст, который будет передан в `default` слот компонента.
   */
  textContent: {
    type: [String, Number],
    default: '',
  },
});

const ALLOWED_TAGS = new Set(['span', 'p']);

const isIcon = computed(() => props.component === 'SvgIcon');

const component = computed(() => {
  if (!props.component || ALLOWED_TAGS.has(props.component)) return props.component;

  try {
    return defineAsyncComponent(
      () => import(`@/components/${props.component}/${props.component}.vue`),
    );
  } catch {
    return 'span';
  }
});
</script>

<template>
  <component
    :is="component"
    v-if="component"
    v-bind="props.arguments"
    class="cell-content"
  >
    {{ props.textContent }}
  </component>
  <template v-else>{{ props.textContent }}</template>
  <p
    v-if="isIcon && props.textContent"
    class="visually-hidden"
  >
    {{ props.textContent }}
  </p>
</template>
