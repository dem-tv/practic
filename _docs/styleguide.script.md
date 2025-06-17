# Правила написания JavaScript/TypeScript кода

Данные правила призваны упростить и ускорить процесс ревью кода.

Разработчик должен проверять свой код на соответствие перечисленным критериям перед созданием мердж-реквеста и его отправки на ревью.

1. [Реализация задачи](#реализация-задачи)
2. [Форматирование и стиль кода](#форматирование-и-стиль-кода)
3. [Именование](#именование)
4. [Оптимальность и читаемость кода](#оптимальность-и-читаемость-кода)

## Реализация задачи

### Выполнены все пункты технического задания в полном объёме.

* Нечёткие пункты задачи обсуждены с бизнес-аналитиком (и/или тестировщиком в случае ошибки).

* При явной нехватке каких-либо данных по задаче, в задаче оставлен __приватный__ комментарий об этом. Производится коммуникация с бизнес-аналитиком, задача может быть возвращена на анализ.

### Исполнение кода не приводит к необработанным ошибкам.

* Код является кросс-браузерным и корректно работает в разных браузерах и разных операционных системах.

* В консоли браузера не отображаются ошибки (вне зависимости от браузера и операционной системы), за исключением ошибок расширений браузера.

* При работе с интерфейсом, приложение не ломается и не зависает.

## Форматирование и стиль кода

### В редакторе кода настроена корректная работа `TypeScript`, `ESLint`, `Stylelint` и `Prettier`.

* Не возникает ошибок при проверке проекта линтерами и тайпскриптом.

* При сохранении файлов происходит автоматическое форматирование.

### Код __единообразен__ и соответствует принятому на проекте стилю кода.

* Разработка ведётся единообразно с существующими модулями проекта.

* Используется единый стиль именования свойств и компонентов.

* При создании компонентов используется `Composition API` и `script setup`.

* Свойства и методы внутри компонентов, модулей и *composables* упорядочены в соответствии с принятой на проекте [структурой](styleguide.component-structure.md).

* Блоки кода (в том числе многострочные входные параметры) отделены друг от друга одной пустой строкой для лучшей читаемости.

  Неверно:
  ```javascript
  const props = defineProps({
    value: {
      type: String,
      required: true
    },
    focused: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
  });
  const formattedValue = computed(() => {
    // ...
  });
  const inputClasses = computed(() => {
    // ...
  });
  ```

  Верно:
  ```javascript
  const props = defineProps({
    value: {
      type: String,
      required: true
    },

    focused: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      required: true
    },
  });

  const formattedValue = computed(() => {
    // ...
  });

  const inputClasses = computed(() => {
    // ...
  });
  ```

## Именование

### Название переменных, параметров, свойств и методов начинается со строчной буквы и записываются в нотации `camelCase`.

* Критерий касается как свойств, объявленных самим разработчиком, так и полученных извне.

* Для конвертации можно использовать отдельную функцию-утилиту.

  ```javascript
  fetch('https://example.lwo-dev.by/api/user')
      .then((response) => response.json())
      .then(({ user_name: userName, user_age: userAge }) => ({
        userName,
        userAge,
      }));
  ```

  ```javascript
  // с использованием утилиты для конвертации
  fetch('https://example.lwo-dev.by/api/user')
      .then((response) => response.json())
      .then((dataObject) => getNormalizedCase(dataObject));
  ```

### Для названия значений используются английские существительные.

* Сокращения в словах запрещены. Сокращённые названия переменных можно использовать, только если такое название широко распространено.

  Допустимые сокращения:

  - `evt` и `e` для объектов `Event` и его производных (`MouseEvent`, `KeyboardEvent` и подобные);
  - `i`, `j`, `k`, `l`, `t` для счётчика в цикле, `j` для счётчика во вложенном цикле и так далее по алфавиту;
  - `cb` для единственного колбэка в параметрах функции;
  - `img` для именования переменной, содержащей ссылку на тег `<img>`;
  - `btn` для именования переменной, содержащей ссылку на тег `<button>`;
  - `src` для именования переменной, хранящей адрес, например изображения;
  - `err` для обозначения объекта ошибок в конструкциях `try...catch` или колбэках.

### Свойства-флаги и функции, которые содержат или возвращают булево значение, должны именоваться по схеме «`is`/`not`/`has` + признак + сущность».

Нежелательно:
```javascript
const pending = ref(false);
```

Верно:
```javascript
const isPending = ref(false);
```

Правильно для входных параметров:
```javascript
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
```

Если в компоненте/модуле есть несколько сущностей:
```javascript
const isPendingUsers = ref(false);
const isPendingTasks = ref(false);

const hasBlockedUsers = ref(false);
```

Правильно и для функций:
```typescript
function isNull(value: any) {
  return value === null;
}

function hasEvenNumbers(numberList: number[]) {
  return numberList.some((number) => number % 2 === 0);
}
```

### Названия констант (постоянных значений, __известных до начала выполнения программы__) написаны в верхнем регистре и располагаются в самом верху файла, сразу после импортов.

* Слова написаны прописными (заглавными) буквами и разделяются подчёркиваниями (`UPPER_SNAKE_CASE`).

* Порядок слов должен быть "от общего к частному". Общее и частное зависит от контекста компонента/модуля.

  Неправильно
  ```js
  const FIRST_KEY = 'A';
  const SECOND_KEY = 'B';
  const THIRD_KEY = 'C';
  ```

  Правильно (для глобальных констант)
  ```js
  const KEY_FIRST = 'A';
  const KEY_SECOND = 'B';
  const KEY_THIRD = 'C';
  ```

  * Однотипные константы желательно объединять в объект-перечисление, где общая часть перенесена в название этого объекта:

    Неверно:
    ```js
    const KEYS = {
      KEY_FIRST: 'A',
      KEY_SECOND: 'B',
      KEY_THIRD: 'C',
    };

    console.log(KEYS.KEY_FIRST);
    ```

    Верно:
    ```js
    const KEYS = {
      FIRST: 'A',
      SECOND: 'B',
      THIRD: 'C',
    };

    console.log(KEYS.FIRST);
    ```

  Правильно (для констант, сгруппированных по фичам):
  ```js
  const FEATURE_ONE_INDEX = 0;
  const FEATURE_TWO_INDEX = 1;
  const FEATURE_THREE_INDEX = 2;
  // Пример:
  const SEARCH_INDEX = 0;
  const FORM_INDEX = 1;
  const PAGE_INDEX = 2;
  ```

* Использование ключевого слова `const` не означает автоматически, что свойство является константой и должно быть записано в верхнем регистре. Внутри функций и методов позволяется именовать сущности в стиле естественного английского языка в `camelCase`.

  ```javascript
  function printGreating(daytime, userName) {
    const daytimes = {
      morning: 'Доброе утро',
      day: 'Добрый день',
      evening: 'Добрый вечер',
      night: 'Добрая ночь',
    };

    console.log(`${daytimes[daytime]}, ${userName}`);
  }
  ```

* Свойства, значения которых могут изменяться со временем, не оформляются константой.

  Неверно:
  ```javascript
  const PI = ref(3.14);

  const CIRCLE_S = computed(() => PI.value * (props.radius ** 2));
  ```

  Верно:
  ```javascript
  const PI = 3.14;

  const circleArea = computed(() => PI  * (props.radius ** 2));
  ```

### Название компонента состоит из двух и более слов, начинается с заглавной буквы и записывается в нотации `PascalCase`.

  * Название компонента должно всегда состоять из нескольких слов, за исключением корневого компонента `App` и встроенных компонентов самого `Vue`, например, `<transition>` или `<component>`.

  * Название компонента должно состоять из полных слов (английских существительных), а не аббревиатур.

  * Дочерние компоненты, тесно связанные с родителями, должны включать имя родительского компонента в качестве префикса.

    ```
    components/
    |- TodoList/TodoList.vue
    |- TodoListItem/TodoListItem.vue
    |- TodoListItemButton/TodoListItemButton.vue
    ```

  * Компоненты должны именоваться с высшего уровня (часто наиболее общих слов) и заканчиваться описательными дополняющими словами.

    ```
    components/
    |- SearchButtonClear
    |- SearchButtonRun
    |- SearchInputQuery
    |- SearchInputExcludeGlob
    |- SettingsCheckboxTerms
    |- SettingsCheckboxLaunchOnStartup
    ```

  * Компоненты, которые должны иметь только один активный экземпляр, именуются с префиксом `The`, чтобы обозначить, что он может быть только один.

    > Это не означает, что компонент будет использоваться лишь на одной странице, но означает что он будет использоваться только один раз _на странице_. Такие компоненты никогда не принимают входных параметров, поскольку они специфичны для приложения, а не для их контекста в приложении. Если обнаружите необходимость передачи входных параметров, это хороший признак того, что на самом деле этот компонент для многократного использования, который лишь используется только один раз на странице _в данный момент_.

    ```
    components/
    |- TheHeading.vue
    |- TheSidebar.vue
    ```

  * Компоненты-представления (страницы) именуются с постфиксом `View`.

    ```
    views/
    |- AuthorizationView.vue
    |- MainView.vue
    ```

### Название класса начинается с заглавной буквы и записывается в нотации `PascalCase`, состоит из английских существительных.

Неверно:
```javascript
class user {}
class CreateUser {}
```

Верно:
```javascript
class User {}
class AppUser {}
```

*Примечание: использования классов в проекте необходимо избегать.*

### Название типа или интерфейса начинается с заглавной буквы и записывается в нотации `PascalCase`. __Не используется__ префикс и постфикс типа/интерфейса вместе с названием.

Неверно:
```typescript
type TUserId = string | number;

interface IUser {
  id: TUserId;
  name: string;
}
```

Верно:
```typescript
type UserId = string | number;

interface User {
  id: UserId;
  name: string;
}
```

### Массивы названы либо существительными в единственном числе с постфиксом `List`, либо во множественном числе без постфикса.

* Для обычных свойств предпочитается формат с постфиксом `List`, он указывает на возможность перечисления списка (имеет метод `forEach`). Но не считается ошибкой и использование существительного во множественном числе.

  Неверно:
  ```javascript
  const usersList = ['John', 'Alice']; // существительное должно быть в единственном числе
  const user = ['John', 'Alice']; // при отсутствии постфикса List существительное должно быть во множественном числе
  ```

  Верно:
  ```javascript
  const userList = ['John', 'Alice'];
  const users = ['John', 'Alice'];
  ```

* Для входных параметров с массивом используется множественное число, чтобы сократить длину html-атрибута, представляющего данный входной параметр во vue-шаблонах.

  Неправильно для входного параметра:
  ```javascript
  const props = defineProps({
    userList: {}, // нежелательно, лишняя длина названия будущего атрибута
  });
  ```

  Правильно для входного параметра:
  ```javascript
  const props = defineProps({
    users: {},
  });
  ```

### Объекты, хеш-наборы, хеш-таблицы и прочие подобные сущности, содержащие наборы единообразных данных, названы во множественном числе.

Неверно:
```javascript
const userList = {'John', 'Alice', 'Peter'};
const allowedUser = new Set(['John', 'Alice']);
```

Верно:
```javascript
const users = {'John', 'Alice', 'Peter'};
const allowedUsers = new Set(['John', 'Alice']);
```

### В названии свойств не используется тип данных или структуры.

* Отсутствуют слова `array`, `object`, `ref`, `computed` и т.д.

  Неверно:
  ```javascript
  const userObject = {'John', 'Alice'};
  const userArray = ['John', 'Alice'];

  const userNameRef = ref('Peter');
  ```

  Верно:
  ```javascript
  const users = {'John', 'Alice'};
  const userList = ['John', 'Alice'];

  const userName = ref('Peter');
  ```

  * Допустимо использование таких слов, если описывают не структуру (код), а сущность или предметную область:

  ```javascript
  const UNIDENTIFIED_FLYING_OBJECT = '🛸';
  ```

### Название функции или метода содержит глагол в качестве префикса.

* Название функции, которая возвращает простое значение, имеет префикс `get`.

  Неверно:
  ```typescript
  function sumNumbers(...numbers: number[]) {}
  ```

  Верно:
  ```typescript
  function getNumberSum(...numbers: number[]) {}
  ```

* Название функции, которая устанавливает значение внешнего свойства (через замыкание), имеет префикс `set` и содержит название изменяемого свойства.

  ```typescript
  let myNumberProperty = 0;
  function setMyNumberProperty(newValue: number) {
    myNumberProperty = newValue;
  }
  ```

* Название функции, которая реализует api-запрос на сервер, имеет префикс `fetch`.

  Неверно:
  ```javascript
  async function downloadUserData() {}
  ```

  Верно:
  ```javascript
  async function fetchUserData() {}
  ```

* Название функции, которая возвращает другую функцию или объект с методами и/или реактивными свойствами, имеет префикс `use` (как *composables*) или `create`.

  ```typescript
  function useCounter() {
    const count = ref(0);

    function increaseCount(value: number = 1) {
      count.value += value;
    }

    return { count, increaseCount };
  }
  ```

__Исключения:__

  * Функции, возвращающие булево значение имеют префикс `is`/`not`/`has`.

    Неверно:
    ```javascript
    function even(number: number) {}
    ```

    Верно:
    ```javascript
    function isEven(number: number) {}
    ```

  * Функции-обработчики имеют префикс `on`.

### Функции-обработчики именуются по схеме «`on` + название события + на каком элементе» (либо «`on` + на каком элементе + название события»), если при событии необходимо произвести более одного действия.

Верно:
```javascript
function onFormSubmitButtonClick(event) {
  // Действие 1 (отправка запроса)
  // Действие 2 (загрузка новых данных исходя из параметров, полученных в ответе на первый запрос или переход на другую страницу)
}
```

Допустимо, если в обработчике выполняется лишь одно действие:
```javascript
function submitForm(event) {}
```

### Название методов и свойств объектов не содержит название объектов.

Неверно:
```javascript
const modal = {
  modalId: '1',
  openModal() {},
};
```

Верно:
```javascript
const modal = {
  id: '1',
  open() {},
};
```

### Названия свойств, созданных при помощи макросов `defineProps` и `defineModel` соответствуют стилю, принятому для html-атрибутов.

* Входные параметры записываются в `camelCase` при определении, но `kebab-case` в шаблонах.

  ```js
  const props = defineProps({
    greetingText: {},
  });
  ```
  ```html
  <WelcomeMessage greeting-text="hi"/>
  ```

* Название входного параметра __не содержит__ префикс и постфикс (`is...`, `...List` и т.д.)

  Неверно:
  ```javascript
  const props = defineProps({
    userList: {},
    isLoading: {},
  });
  ```

  Верно:
  ```javascript
  const props = defineProps({
    users: {},
    loading: {},
  });
  ```

* Названия входных параметров, которые по смыслу соответствуют существующим в html атрибутам записываются буква в букву.

  Неверно:
  ```javascript
  // Условный компонент BaseInput.vue
  const props = defineProps({
    // названия похожи на реальные html-атрибуты тега input, но не соответствуют им
    maxLength: {}, // конвертируется в max-length
    minLength: {}, // конвертируется в min-length
  });
  ```

  Верно:
  ```javascript
  // Условный компонент BaseInput.vue
  const props = defineProps({
    // названия соответствуют реальным html-атрибутам тега input
    maxlength: {},
    minlength: {},
  });
  ```

### Свойства носят абстрактные названия и не содержат имён собственных.

Неверно:
```javascript
const vasya = {
  id: 1,
  name: 'Вася',
};
```

Верно:
```javascript
const user = {
  id: 2,
  name: 'Петя',
};
```

### Название файла соответствует его содержимому.

```html
<!-- Файл компонента BaseButton.vue -->
<script setup lang="ts"></script>

<template>
  <button
    type="button"
    class="button"
  >
    <slot></slot>
  </button>
</template>
```

```typescript
// Файл getSum.ts
export function getSum(...numbers: number[]): number {}
```

* Если из файла экспортируется множество сущностей, файл именуется по общей начальной части названия, либо во множественном числе по общему для сущностей признаку.

  ```javascript
  // Файл getLocaleDate.ts — название по общей части имён экспортируемых функций
  export function getLocaleDate() {}
  export function getLocaleDateTime() {}
  ```

* В качестве исключения, файлы констант именуются в `camelCase`.

  ```javascript
  // Файл userStatuses.ts
  export const USER_STATUS_ACTIVE = 'active';
  export const USER_STATUS_BLOCKED = 'blocked';
  ```

  ```javascript
  // Файл userStatuses.ts
  export const USER_STATUSES = {
    ACTIVE: 'active',
    BLOCKED: 'blocked',
  }
  ```

## Оптимальность и читаемость кода

### Весь код проекта пишется на языке `TypeScript` в `.ts`-файлах или `Vue`-компонентах.

  * Типы и интерфейсы пишутся в максимально простом виде, чтобы мог понять даже начинающий разработчик.

  * Не используется `enum` — в отличии от типов, данная структура лишним мусором попадает в сборку проекта и исполняется в рантайме. Так же не используется и `const enum`, т.к. в некоторых случаях сильно замедляется скорость пересборки проекта. В качестве замены используются union-types.

  * Не используется `namespace` — как и `enum`, попадает в сборку и рантайм.

  * Не используются декораторы (до принятия стандарта `ECMAScript`).

### В коде проекта нет файлов и частей кода, которые не используются, включая закомментированные участки кода.

* В коде нет объявленных, но неиспользуемых свойств и функций.

* В коде нет недоступного кода, который никогда не выполнится.

  Неверно:
  ```javascript
  if (false) {
    doSomething();
  }
  ```

### В коде не используются «магические значения», под каждое из них заведена отдельная константа или переменная.

Неверно:
```javascript
function getCircleArea(radius) {
  return 3.14 * Math.pow(radius, 2);
}
```

Верно:
```javascript
const PI = 3.14;
const CIRCLE_AREA_RADIUS_POWER = 2;

function getCircleArea(radius) {
  return PI * Math.pow(radius, CIRCLE_AREA_RADIUS_POWER);
}
```

Допустимо:
```javascript
function callAfterTimeout(callback) {
  const timeout = 1000;
  setTimeout(callback, timeout);
}
```

### Для создания реактивных свойств используется `ref`.

* Между `ref` и `reactive` стоит выбирать `ref` для единообразия по проекту.

* Для сохранения объектов и массивов, принятых с сервера, стоит использовать `shallowRef`.

### Сложные вычисляемые свойства должны быть разбиты на как можно большее количество более простых свойств.

Неверно:
```javascript
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value);
  return basePrice - basePrice * (discountPercent.value || 0);
})
```

Верно:
```javascript
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value),
);

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0),
);

const finalPrice = computed(() => basePrice.value - discount.value);
```

### Не используются ES-классы.

Вместо классов используются *composables*.

### Из одного файла экспортируется не больше одной *composable*-функции, компонента или класса.

  Константы и однотипные функции-утилиты могут экспортироваться массово.

### Не используется `export default` в модулях и компонентах проекта

* Используются именованные экспорты.

  Неверно:
  ```javascript
  function getSomething() {
    return 'someThing';
  }
  export default getSomething;
  ```

  Верно:
  ```javascript
  export function getSomething() {
    return 'someThing';
  }
  ```

* Исключение: экспорт компонентов, в которых нет `<script setup>` и других сущностей фреймворка, которые работают только с `export default`.

### Нет избыточных проверок (условий).

Неверно:
```javascript
function isEven(number) {
  if (typeof number === 'undefined') {
    throw new Error('Parameter is not defined');
  }
  return number % 2 === 0;
};
```

Верно:
```javascript
function isEven(number) {
  return number % 2 === 0;
}
```

### Условия упрощены.

* Если функция возвращает булево значение, не используется `if else` с лишними `return`.

  Неверно:
  ```javascript
  function isEqual(firstValue, secondValue) {
    if (firstValue === secondValue) {
      return true;
    } else {
      return false;
    }
  }
  ```

  Верно:
  ```javascript
  function isEqual(firstValue, secondValue) {
    return firstValue === secondValue;
  }
  ```

* Там, где возможно, в присвоении значения вместо if используется тернарный оператор.

  Неверно:
  ```javascript
  let userRole;
  if (isAdmin) {
    userRole = 'Администратор';
  } else {
    userRole = 'Пользователь';
  }
  ```

  Верно:
  ```javascript
  const userRole = isAdmin ? 'Администратор' : 'Пользователь';
  ```

* При использовании условного оператора альтернативная ветка опускается, вместо оператора `else...if...else` должен использоваться `return` внутри условия для прекращения работы функции, если после всех условий не требуется выполнение дополнительного кода.

  Неверно:
  ```javascript
  function getSomething(value, anotherValue) => {
    if (value > anotherValue) {
      // Дополнительный код
      return value;
    } else {

      // Дополнительный код
      return anotherValue;
    }
  }
  ```

  Верно:
  ```javascript
  function getSomething(value, anotherValue) => {
    if (value > anotherValue) {
      // Дополнительный код
      return value;
    }

    // Дополнительный код
    return anotherValue;
  }
  ```

  Неверно:
  ```javascript
  function doSomething(number) => {
    if (number === 1) {
      // Действие 1
    } else if (number === 2) {
      // Действие 2
    } else if (number === 3) {
      // Действие 3
    } else {
      // Действие по умолчанию
    }
  }
  ```

  Верно:
  ```javascript
  function doSomething(number) => {
    if (number === 1) {
      // Действие 1
      return;
    }

    if (number === 2) {
      // Действие 2
      return;
    }

    if (number === 3) {
      // Действие 3
      return;
    }

    // Действие по умолчанию
  }
  ```

* В условии нет крупных выражений, они вынесены в переменные перед условием.

  Неверно:
  ```javascript
  if (date === dayjs(item.startTime).format(DATE_FORMAT_ISO)) {
    setPeriod(item.convertedCcyCode, item);
  }
  ```

  Верно:
  ```javascript
  const startDate = dayjs(item.startTime).format(DATE_FORMAT_ISO);

  if (date === startDate) {
    setPeriod(item.convertedCcyCode, item);
  }
  ```

### Условие не содержит отрицания (по возможности).

Условие должно содержать утверждение, а не отрицание, если только это не ведёт к усложнению кода.

Неверно:
```javascript
if (!isCondition) {
  doSomethingOne();
  return;
}

doSomethingTwo();
```

Верно:
```javascript
if (isCondition) {
  doSomethingTwo();
  return;
}

doSomethingOne();
```

Верно: использование отрицания оправдано, т.к. визуально упрощает код
```javascript
if (!isCondition) return;

doSomething();
```

### Запрещено использовать `case` без `break` или `return` в блоках `switch`.

Неверно:
```javascript
switch(someVariable) {
  case otherVariableOne:
    doSomethingOne();
  case otherVariableTwo:
    doSomethingTwo();
  case otherVariableThree:
    doSomethingThree();
}
```

Верно:
```javascript
switch(someVariable) {
  case otherVariableOne:
    doSomethingOne();
    break;

  case otherVariableTwo:
    doSomethingTwo();
    break;

  case otherVariableThree:
    doSomethingThree();
    break;

  default:
    break;
}
```

* Используется синтаксис без фигурных скобок для блоков `case`.

* Между блоками `case` оставляется пустая строка для визуального разделения.

* В конце всегда добавляется `default`.

### Отсутствует дублирование и переусложнение кода.

Повторяющиеся части кода должны быть переписаны как функции или вынесены из условий (код соответствует принципу `DRY`).

### Осуществляется своевременный выход из цикла.

Неверно:
```javascript
userList.forEach((user, index) => {
  if (index < TOP_USER_COUNT) {
    console.log('Пользователь в первой десятке!');
  }
});
```

Верно:
```javascript
for (let i = 0; i < TOP_USER_COUNT; i++) {
  console.log('Пользователь в первой десятке!');
}
```

Неверно:
```javascript
for (const number of numbers) {
  if (number <= MAX_COUNT) {
    console.log(number);
  }
}
```

Верно:
```javascript
for (const number of numbers) {
  console.log(number);
  if (number === MAX_COUNT) break;
}
```

### Тяжелые операции, которые могут быть вынесены из цикла, должны выполняться вне цикла.

Неверно:
```javascript
userList.find((user) => {
  // вложенный поиск будет осуществляться каждую итерацию
  const allowedStatus = statuses.find((status) => status.code === 'OK');

  return user.statusId === allowedStatus.id;
});
```

Верно:
```javascript
const allowedStatus = statuses.find((status) => status.code === 'OK');

userList.find((user) => {
  return user.statusId === allowedStatus.id;
});
```

### Для работы с коллекциями используются итераторы для массивов `forEach`, `map`, `find` и другие.

```javascript
const userList = users.map((user) => ({
  ...user,
  fullName: `${user.firstName} ${user.familyName} ${user.patronymic}`,
}));
```

### Рекурсия используется только для обработки древовидных структур.

Использование рекурсивных функций может привести к переполнению стека вызовов, поэтому их стоит избегать для операций неопределенной продолжительности (как, например, интервальные запросы на сервер).

### Длинные функции и методы разбиты на несколько небольших.

### Оператор присваивания не используется как часть выражения.

Неверно:
```javascript
let userList = null;
const userName = getUserNameById(userList = JSON.parse(users), id);
```

Верно:
```javascript
const userList = JSON.parse(users);
const userName = getUserNameById(userList, id);
```

### Обработчики событий, установленные через `eventListener`, добавляются и удаляются своевременно.

Для защиты от `memory-leak` обработчики событий должны удаляться после наступления определенного условия или события жизненного цикла приложения, после которого обработчик не нужен.

```javascript
function onMouseDown(evt) {}

document.addEventListener('mousedown', onMouseDown);

onUnmounted(() => {
  document.removeEventListener('mousedown', onMouseDown);
});
```

### Свойства компонента не используются снаружи.

* Не используются приватные/защищенные поля экземпляра компонента через `getCurrentInstance` внутри и через `ref` снаружи. Исключение: в редких случаях допустимо получение `uid` экземпляра компонента.

* Не используется макрос `defineExpose` в компонентах, если этого можно избежать. Его можно заменить на `props` и `emits` в большинстве случаев.

### Не используется `query` при создании именованных рутов `vue-router`.

  * Чаще всего, вместо `query` требуется использование `params`.

  * `query` используется в представлениях для отражения в адресной строке изменений текущей страницы, вызванных действием пользователя (значения полей фильтрации, например).

  * Обработка рутов должна быть реализована так, чтобы при переходе по ссылке без дополнительный query-параметров, базовое состояние страницы отобразилось корректно.

### Запрещено напрямую обращаться к значению `undefined` или присваивать его.

* Для проверки типа рекомендуется использовать `typeof`.

* Чаще всего при присвоении имеет смысл использовать  `null` или `false`.

__Исключения:__

* Явная передача `undefined` в атрибут компонента или при вызове функции вместо аргумента, чтобы использовать значение параметра по умолчанию.

* Установка в параметры запроса, чтобы эти поля не отправлялись в запросе.

### Запрещено использовать метод `innerHTML` и директиву `v-html` для вставки в верстку данных, полученных снаружи (пользовательский ввод, данные с сервера).

Динамический рендеринг произвольного HTML может быть очень опасен, поскольку легко может привести к XSS-атакам.

### В комментариях текст начинается с заглавной буквы и заканчивается точкой, отбивается пробелом от начала комментария.

Неверно:

    //комментарий начинается со строчной (маленькой) буквы и в конце не стоит точка, а так же не имеет пробела после двух косых черт в начале

Верно:

    // Комментарий написан с заглавной буквы, имеет точку в конце предложения и пробел после двух косых черт.

Комментарии пишутся в академическом стиле, без шуток, мата и прочего нетехнического сленга.

Комментарий должен в большей степени раскрывать для чего нужен данный участок кода и какие у него особенности, а не что он делает.

### В коде нет забытых вызовов `console` и инструкций `debugger`.
