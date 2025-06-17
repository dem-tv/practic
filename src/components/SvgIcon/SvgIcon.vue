<script lang="ts">
import type { FunctionalComponent } from 'vue';
import { h } from 'vue';

/**
 * Функциональный компонент SVG-иконки.
 * Не создаёт экземпляр Vue, за счёт чего обладает
 * повышенной производительностью.
 * Примечание: вопрос производительности имеет значение
 * только для компонентов, количество одновременных
 * экземпляров которых составляет десятки и сотни.
 */
const TAG_NAME_COMPONENT = 'svg';
const TAG_NAME_INNER = 'use';

type Props = {
  name: IconType;
};

const SvgIcon: FunctionalComponent<Props> = (props, context) => {
  return h(
    TAG_NAME_COMPONENT,
    {
      ...context.attrs,
      width: 24,
      height: 24,
      class: 'icon',
      focusable: 'false',
      'aria-hidden': 'true',
    },
    [
      h(TAG_NAME_INNER, {
        href: `#${props.name}`,
      }),
    ],
  );
};

export default SvgIcon;
</script>

<style lang="scss" src="./SvgIcon.scss"></style>
