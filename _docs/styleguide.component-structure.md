# Структурирование (группировка) кода в компонентах

В данном проекте используется **Composition API**, что накладывает определенный отпечаток на группировку кода.
В **Options API** у нас были крупные блоки `data`, `computed`, `watch`, `methods` и прочие, следить за их порядком было не сложно т.к. отсутствовала проблема вызова до инициализации.

В рамках **Composition API** всё несколько сложнее, но стараться придерживаться некоторого порядка так же необходимо.

1. [Порядок секций компонента](#порядок-секций-компонента)
2. [Порядок блоков кода](#порядок-блоков-кода-внутри-script-setup-страниц-view-и-крупных-компонентов-а-так-же-в-composables)
3. [Порядок атрибутов html-элементов и компонентов в шаблонах](#порядок-атрибутов-html-элементов-и-компонентов-в-шаблонах)

## Порядок секций компонента:

```html
<script setup lang="ts"></script>

<template></template>

<style lang="scss"></style>
```

## Порядок блоков кода внутри `script setup` страниц (View) и крупных компонентов, а так же в *composables*:

1. Импорты.

2. КОНСТАНТЫ_КОМПОНЕНТА (в верхнем регистре).

3. Блоки кода, относящийся к реализации определенного функционала, каждый блок так свой порядок.

    - `defineProps`
    - `defineEmits`
    - `defineModel`
    - `composables`
    - `refs`, `reactive`
    - `computed`
    - `methods`
    - `watch`, `watchEffect`
    - Вызов методов с логикой исключительно данного функционального блока при инициализации компонента, можно объединять в методе с префиксом `onCreate` в имени функции (пример: `onCreateTableBlock`).
    - Хуки жизненного цикла в порядке их вызова:

      - `onBeforeMount`
      - `onMounted`
      - `onBeforeUpdate`
      - `onUpdated`
      - `onBeforeUnmount`
      - `onUnmounted`
      - `onErrorCaptured`
      - `onRenderTracked`
      - `onRenderTriggered`
      - `onActivated`
      - `onDeactivated`

4. Вызов методов, которые содержат в себе общую для нескольких функциональных блоков логику и должны быть вызваны при инициализации компонента. Желательно объединить вызов в методе с именем `onCreated`, который можно создать общем функциональном блоке (ставится перед остальными блоками).

5. Реализация публичных свойств компонента при помощи `defineExpose`.

Небольшие отступления от данного порядка **допустимы** для осуществления корректного вызова функций и переменных после их инициализации. Например, если нужно передать реактивное значение в параметр *composable*-функции, инициализацию можно сделать и после `refs` и `computed`. Однако, если реализовать функцию-сеттер в *composable*-функции, то порядок менять скорее всего не придётся.

В промежутках могут объявляться функции и переменные, которые используются в замыканиях внутри вычисляемых свойств, вотчеров, хуков, методов и т.д.

Блоки разделяются пустыми строками.

Пример:
```ts
import formatText from '@/utils/formatText';

const CONSTANT = 1;

/** ОБЩИЕ СВОЙСТВА (определение свойств, которые могут быть использованы в разных блоках) */
const props = defineProps({
  someProperty: {
    type: String,
    default: '',
  },
});

const route = useRoute();

/** ПЕРВЫЙ ФУНКЦИОНАЛЬНЫЙ БЛОК */
const emit = defineEmits(['world-change']);

// Reactive variables
const hello = ref('Hello');
const world = ref('world');

// Composables
const somethingOne = useSomethingOne();

// Computed
const helloWorld = computed(() => hello.value + world.value);
const worldHello = computed(() => world.value + hello.value);

// Methods (предпочитаем function declaration, чтобы можно было вызывать выше по коду)
function onHelloClick() {
  // helloWorld.value;
};

function doSomethingOne() {
  // something 1
}

function onCreatedBlockOne() {
  hello.value = formatText(props.someProperty || 'Hi');
}

// Watchers (колбэки желательно выносить в блок методов, но иногда можно объявлять прямо перед вотчером)
const onWorldChange = () => {
  emit('world-change');
}
watch(world, onWorldChange);

watchEffect(() => {
// world.value;
});

// Блок вымышленного onCreated (хук жизненного цикла)
onCreateBlockOne();

// Lifecycle Hooks
onMounted(() => {
  // props.someProperty;
});

/** ВТОРОЙ ФУНКЦИОНАЛЬНЫЙ БЛОК */
// Reactive variables
const myReactiveObject = reactive({});
const myFoo = ref('foo');
const myBar = ref('bar');

// Composables
const somethingTwo = useSomethingTwo();

// Computed
const myFooBar = computed(() => myFoo.value + myBar.value);
const myBarFoo = computed(() => myBar.value + myFoo.value);

// Methods (предпочитаем function declaration, чтобы можно было вызывать выше по коду)
function onFooButtonClick() {
  myReactiveObject.myBarFoo = myBarFoo.value;
  // myFooBar.value, myReactiveObject.myBarFoo;
  // props.someProperty;
};

function doSomethingTwo() {
  // something 2
}

function doSomethingElse() {
  // something
}

function onBarFooChange() {
  // onBarFooChange;
}

// Watchers (колбэки желательно выносить в блок методов, но иногда можно объявлять прямо перед вотчером)
watch(myBarFoo, onBarFooChange);
watch(() => props.someProperty, () => {
  // myBarFoo.value;
})

// Блок вымышленного onCreated (Lifecycle Hook)
doSomethingElse();

/**
 * ОБЩАЯ ЛОГИКА
 * (использование свойств и методов, которые могут быть
 * созданы или вызваны после инициализации остальных блоков)
 */
function onCreated() {
  doSomethingOne();
  doSomethingTwo();
}

onCreated();

/** ПУБЛИЧНЫЕ СВОЙСТВА КОМПОНЕНТА */
defineExpose({ myFooBar, myBarFoo });
```

## Порядок атрибутов html-элементов и компонентов в шаблонах:

- Определение (предоставляет параметры компонента)

  `is`

- Отображение списка (создаёт несколько вариантов одного элемента)

  `v-for`

- Условия (указывается рендерится/отображается ли элемент)

  `v-if`

  `v-else-if`

  `v-else`

  `v-show`

  `v-cloak`

- Модификаторы отрисовки (изменяют способ отрисовки элемента)

  `v-pre`

  `v-once`

- Глобальная осведомлённость (требует знаний вне компонента)

  `id`

- Уникальные атрибуты (атрибуты, требующие уникальных значений)

  `ref`

  `key`

- Двусторонняя привязка (объединение привязки и событий)

  `v-model`

- HTML-атрибуты (все неуказанные связанные или несвязанные атрибуты)

  `model-value`

  `for`

  `value`

  `arial-label`

- Список css-классов

  `class`

- События (обработчики событий компонента)

  `v-on` в синтаксисе `@`

- Содержимое (перезаписывает содержимое элемента)

  `v-html`

  `v-text`

Пример:

```html
<component
  :is="currentComponent"
  v-if="isRendered"
  v-show="isVisible"
  id="dynamic-component"
  ref="dynamicComponent"
  :key="componentKey"
  v-model="model"
  :aria-label="componentAriaLabel"
  class="super-component"
  :class="classList"
  @event="onEvent"
/>
```
