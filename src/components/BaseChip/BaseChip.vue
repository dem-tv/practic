<script setup lang="ts">
const TAB_INDEX_FOCUSABLE = 0;

const props = defineProps({
  /**
   * Меняет тег элемента reset-кнопки. По умолчанию 'span'.
   */
  tag: {
    type: String as PropType<'span' | 'p' | 'button'>,
    default: 'p',
  },

  /**
   * Свойство отвечает за возможность удалить чип.
   */
  removable: {
    type: Boolean,
    default: true,
  },

  /**
   * Свойство отвечает за вид неактивного чипа.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'click:remove'): void;
  (e: 'click'): void;
}>();

const classNames = computed(() => ({
  'chip--disabled': props.disabled,
}));

const tabindex = computed(() => (props.disabled || props.removable ? null : TAB_INDEX_FOCUSABLE));

function onClickRemove() {
  if (props.disabled) {
    return;
  }

  if (!props.removable) {
    return;
  }

  emit('click:remove');
}

function onClick() {
  if (props.disabled) {
    return;
  }

  if (tabindex.value !== TAB_INDEX_FOCUSABLE) {
    return;
  }

  emit('click');
}
</script>

<template>
  <component
    :is="tag"
    :tabindex
    class="chip"
    :class="classNames"
    @click="onClick"
  >
    <span class="chip__content">
      <slot />
    </span>
    <button
      v-if="props.removable"
      :disabled="props.disabled"
      aria-label="Удалить значение"
      type="button"
      class="chip__reset"
      @click="onClickRemove"
    >
      <SvgIcon
        name="cross"
        class="chip__icon"
      />
    </button>
  </component>
</template>

<style lang="scss" src="./BaseChip.scss"></style>
