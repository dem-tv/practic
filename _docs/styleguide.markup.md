# Правила написания HTML-кода и CSS

Данные правила призваны упростить и ускорить процесс ревью кода.

Разработчик должен проверять свой код на соответствие перечисленным критериям перед созданием мердж-реквеста и его отправки на ревью.

1. [Реализация задачи](#реализация-задачи)
2. [Форматирование и стиль кода](#форматирование-и-стиль-кода)
3. [Базовая разметка и стилизация](#базовая-вёрстка-и-стилизация)
4. [Отзывчивая вёрстка, адаптивность](#отзывчивая-верстка-адаптивность)
5. [Доступность](#доступность)
6. [Vue-шаблоны](#vue-шаблоны)

## Реализация задачи

### Выполнена HTML-разметка всех требуемых в задаче страниц и всех элементов на этих страницах.

* Вёрстка является кросс-браузерной и корректно отображается в разных браузерах и разных операционных системах, поддержка которых заявлена в проекте.

* При отсутствии макета какого-либо элемента, в задаче оставлен __приватный__ комментарий об этом. Производится коммуникация с бизнес-аналитиком и дизайнером, задача может быть возвращена на анализ.

## Форматирование и стиль кода

### Код соответствует правилам в `Stylelint`.

При выполнении автоматической проверки и консольной команды `npm run stylelint` не возникает ошибок.

### В редакторе кода настроена корректная работа В редакторе кода настроена корректная работа `TypeScript`, `ESLint`, `Stylelint` и `Prettier`.

* Не возникает ошибок при проверке проекта линтерами.

* При сохранении файлов происходит автоматическое форматирование.

### Верстка единообразна по проекту.

* Секции компонентов, а так же html-атрибуты тегов и компонентов в шаблонах упорядочены в соответствии с принятой на проекте [структурой](styleguide.component-structure.md).

## Базовая вёрстка и стилизация

### Грубые ошибки в разметке отсутствуют.

Грубые ошибки:

  * Ссылки сделаны не тегом `<a>`, а другими тегами.

    __Примечание__:
      тег `<a>` — элемент c «прозрачной» моделью содержимого. Поэтому если `<a>`
      вложен в элемент с фразовым содержимым, например, в `<span>`, то внутри самого `<a>` может быть только фразовый контент.
      А если `<a>` вложен в элемент с потоковым содержимым, например, в `<div>`, то и содержимое у `<a>` может быть потоковое — включая другой `<div>`.
      Поэтому в ссылку можно включать целые секции, если `<a>` вложен в потоковый блок.

  * Использование строчных элементов для создания крупных (сеточных) блоков.

  * Абзацы сделаны не тегами `<p>`, а `<br><br>`.

### Вёрстка проходит тест на переполнение контентом.

  * Не ломается при добавлении в элементы большего количества текста.

  * Не ломается при использовании картинок с неподходящими размерами.

  * Не ломается при изменении количества потоковых блоков.
  Текст не выпадает из блоков, нижерасположенные блоки не скрываются, смещение  блоков в потоке сохраняет логику потока (не приводит к нарушению сетки).

### Вложенность тегов проходит проверку на валидность https://caninclude.glitch.me/.

### Все элементы верстки проходят проверку на валидность https://validator.w3.org/nu/.

Так как валидатор не может проверить проект по ссылке (нет доступа), можно копировать верстку в инструментах разработчика, а на валидацию отправлять, переключив на странице валидатора селект в режим `check by text-input`.

### Использовано минимально возможное количество HTML-элементов (нет лишних элементов).

В разметке должно быть использовано минимально возможное количество элементов. Не должно быть лишних обёрток и блоков, которые используются для оформления и могут быть заменены на псевдоэлементы.

### В разметке отсутствует дублирование кода для одного и того же элемента, с помощью которых элемент отображается в разных местах страницы на разных версиях: мобильной, десктопной, планшетной.

__Исключение:__ сильно отличающееся расположение элемента в разных версиях макета. Перед дублированием стоит поговорить с дизайнером о возможности изменения макета.

### Отсутствуют типовые ошибки в разметке по методологии БЭМ.

* Создание элемента без родительского блока: не может быть элемента `block__element`, если выше по дереву нет DOM-элемента с именем `block`.

* Создание элемента для элемента.

  Неверно:
  ```html
  <div class="block__element1">
    <div class="block__element1__element2"></div>
  </div>
  ```

  Верно:
  ```html
  <div class="block__element1">
    <div class="block__element2"></div>
  </div>
  ```

* Создание модификатора для модификатора.

  Неверно:
  ```html
  <div class="block block--mod1--mod2"></div>
  ```

  Верно:
  ```html
  <div class="block block--mod1 block--mod2"></div>
  ```

* Использование модификатора без блока или элемента, который он модифицирует (при использовании модификатора у тега должно быть, как минимум два класса: класс блока/элемента и класс модификатора).

  Неверно:
  ```html
  <div class="block--mod"></div>
  ```

  Верно:
  ```html
  <div class="block block--mod"></div>
  ```

### Названия полей форм привязаны к своим полям с помощью `<label>`.

Для улучшения взаимодействия пользователя с элементами форм должна быть
реализована активация поля при нажатии на его описание.
Для этого необходимо связывать элемент формы с его описанием,
используя тег `<label>` и идентификаторы.

Неверно: описание никак не связано с элементом формы
```html
Покупка <input type="radio" id="buy">
Продажа <input type="radio" id="sell">
```

Верно: элемент формы `radio` связан с его описанием через идентификатор
```html
<label for="buy">Покупка</label>
<input type="radio" id="buy">

<label for="sell">Продажа</label>
<input type="radio" id="sell">
```

Верно: элемент формы radio и подпись обёрнуты в `<label>`
```html
<label>
  Покупка
  <input type="radio" id="buy">
</label>
<label>
  Продажа
  <input type="radio" id="sell">
</label>
```

### Парные HTML-теги всегда имеют закрывающий тег.

В `html` не существует самозакрывающихся тегов. Браузер умеет решать спорные моменты, но иногда может сделать это неверно.

__Внимание:__ самозакрывающиеся теги можно и нужно использовать с тегами компонентов и `svg`, т.к. они являются `xml` элементами.

Неверно:
```html
<div />

<MyComponent></MyComponent>

<svg>
  <path d=""></path>
</svg>
```

Верно:
```html
<div></div>

<MyComponent />

<svg>
  <path d="" />
</svg>
```

Одиночным тегам `Prettier` добавит косую черту в конце, хотя это неверно по спецификации, придётся смириться:
```html
<img src="" />
<br />
```

### У всех растровых и векторных изображений в теге `<img>` прописан размер, у встроенных SVG-изображений размер прописан в теге `<svg>`.

__Внимание__: в атрибутах `width` и `height` нельзя использовать `px`, так как по спецификации размеры в пикселях задаются без единиц измерения. Проценты использовать можно, если картинка должна тянуться.

### Используются правильные шрифты, их размеры, цвет и толщина равны соответствующим параметрам в макетах и/или техническом задании.

Необходимо, чтобы в проекте использовались именно те шрифты, которые
указаны в макете. При этом их размеры, цвета, и жирность должны быть равны
соответствующим параметрам в макетах и техническом задании.

### Нестандартные шрифты подключены локально. Формат шрифтов должен быть `woff2`.

* Все нестандартные шрифты должны быть подключены в CSS из папки fonts с помощью правила `@font-face`. Подключаемые шрифты должны быть в форматах `woff` и `woff2`.

* Используется правило `font-display: swap;`.

* Подключение шрифтов с помощью внешних ресурсов, таких как Google Fonts считается ошибкой.

* Перечисление форматов шрифтов должно начинаться с более современного.

* Для основных шрифтов должна быть добавлена предварительная загрузка в корневом `index.html`.

  ```html
  <link
    rel="preload"
    href="/fonts/PTSans-Regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  >
  ```

### Указаны альтернативные варианты шрифта и тип семейства в конце перечисления `font-family`.

Альтернативный веб-безопасный шрифт и тип семейства необходимо указывать
для того, чтобы в случае отсутствия основного шрифта изменения внешнего вида
шрифтов на странице были минимальны.

Порядок шрифтов следующий:

  1. основной шрифт;
  2. веб-безопасный;
  3. тип шрифта.

Список веб-безопасных шрифтов можно посмотреть по ссылке https://cssfontstack.com.

Альтернативный веб-безопасный шрифт должен быть такого же типа (`serif`/`sans-serif`), что и основной, но подбирать максимально похожий шрифт не нужно.

Неверно: указан только основной шрифт
```css
body {
 font-family: "PTSans";
}
```

Неверно: указан только основной шрифт и тип семейства, альтернативный веб-безопасный шрифт отсутствует
```css
body {
 font-family: "PTSans", sans-serif;
}
```

Неверно: Times New Roman — шрифт с засечками, а основной шрифт — без засечек
```css
body {
 font-family: "PTSans", "Times New Roman", sans-serif;
}
```

Верно:
```css
body {
  font-family: "PTSans", "Arial", sans-serif;
}
```

### При наполнении контентом (как в макете) элементы каждой версии страницы (мобильной, планшетной и десктопной) соответствуют макету.

Вёрстка проверяется на соответствие макету только на указанных в макете вьюпортах.

__Осторожно:__ в ОС __Windows__ в ширину вьюпорта не входит полоса прокрутки.

При проверке допускаются:

  * Погрешность не более 5 пикселей (в отдельных случаях не более 10 пикселей), не считая различий из-за содержимого блоков.

  * Различия в отображении шрифтов, связанные со сглаживанием на различных платформах.

### Не используется избыточная вложенность селекторов, чтобы не  повышать без причины специфичность (вес) селектора.

Большая глубина вложенности усложняет читабельность кода и его поддержку.
Хорошим подходом считается использовать вложенность не больше двух уровней.

__Исключения:__ псевдоэлементы, псевдоселекторы, селекторы с `+` и `~`, `:where()` и аналогичные.

Неверно:
```css
.block .block__inner .block__title {
  font-weight: bold;
}
```

Верно:
```css
.block__title {
  font-weight: bold;
}
```

Допустимо:
```css
.block .checkbox__value:checked ~ .checkbox__state::before {
  display: block;
}
```

### Для стилизации в качестве селекторов используются css-классы. Никогда не используется `#id`.

У селектора `#id` слишком высокая специфичность, из-за которой будут возникать проблемы.

Неверно:
```css
#main-nav {}
#page-footer {}
```

Верно:
```css
.main-nav {}
.page-footer {}
```

Допустимо использовать селекторы атрибутов вместе с классами:

```css
.button[aria-busy] {}
```

### В стилях отсутствует `!important`.

* Допускается использование `!important` при обосновании его необходимости в комментарии.

  ```css
  .block {
    /* stylelint-disable-next-line declaration-no-important */
    background-color: #ffffff !important; // Переопределяет стиль из сторонней библиотеки.
  }
  ```

### В качестве CSS-препроцессора используется `Sass` в синтаксисе `scss`.

### Корректно используется амперсанд (`&`) в стилях.

Использование `&` в стилевых файлах (не примесях) допускается только:

* Для добавления псевдоэлементов и псевдоклассов в контекст селектора.

  ```scss
  .block {
    &::before {
      content: '';
    }

    &:hover {
      ...
    }
  }
  ```

* В местах разделителя элемента или модификатора (перед разделителем).

  Неверно:
  ```scss
  .my {
    &-block {
      ...
      &__element {
        ...
      }
    }
  }
  ```

  Верно:
  ```scss
  .block {
    ...
    &--mod {
    ...
    }

    &__element {
      ...
    }
  }
  ```

Символ `&` всегда должен указывать исключительно на блок (в контексте БЭМ):

Неверно:
```scss
.block {
  &__element {
    &:hover { // Здесь & указывает не на block, а на block__element.
      ...
    }
  }
}
```

Верно:
```scss
.block {
  &__element:hover {
    ...
  }
}
```

### Вложенные селекторы записываются после собственных правил родителя. Вложенные селекторы и правила отделяются пустой строкой.

```scss
.block {
  // Стили для .block

  &__element {
    // Стили для .block__element
  }
}
```

### Стили, не относящиеся к компонентам, выделяются в собственные БЭМ-блоки и сохраняются в отдельных файлах по пути [`/src/assets/styles/blocks`](../assets/styles/blocks).

### Для блока, у которого есть растровое фоновое изображение, прописан фоновый цвет, который соответствует преобладающему цвету изображения.

Использует для перестраховки: если фоновое изображение не загрузится, то на заднем фоне останется преобладающий цвет, страница будет выглядеть похоже на макет.

### При взаимодействии с элементами (наведение, нажатие) ни сам элемент, ни окружающие его блоки не меняют своего положения, если иное не подразумевается техническим заданием или макетом.

## Отзывчивая верстка, адаптивность

### В разметке есть правильный вьюпорт тег.

Адаптивность должна работать на планшетах и мобильных устройствах. То есть не только при изменении ширины окна браузера.

Неверно: добавлены атрибуты `maximum-scale=1` и `user-scalable=0`, которые блокирует масштабирование на мобильных устройствах
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
```

Верно:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

__Внимание:__ в случае с SPA, вьюпорт тег проставляется один раз, при старте проекта, но при дальнейшей разработке важно его случайно не удалить (расположен в корневом `index.html`).

### Выполнена вёрстка всех версий страницы или компонента: мобильной, планшетной и десктопной.

Вне указанных в макете размеров вёрстка должна быть "резиновой":

  * Все элементы продолжают располагаться по сетке, заданной в макете.

  * Блоки не выпадают из родителей и из общего центрирующего блока.

### Выполнена ретинизация растровой графики.

* Растровая графика должна быть подготовлена как минимум для двух вариантов экранов: с обычной и двойной плотностью пикселей. Необходимо обсуждать с дизайнером.

### Для иконок и логотипов используется векторная графика (`SVG`).

* Иконки стандартизированы по размерам (должно быть заранее обсуждено с дизайнером).

### Векторные изображения на странице объединены в спрайт.

Спрайт в проекте создаётся автоматически, для добавления в него иконок, достаточно поместить svg-файл в папку [`/src/assets/icons`](../assets/icons/).

### Перед добавлением в проект, изображения должны быть оптимизированы.

* SVG-иконки оптимизируются при помощи сервиса [SVGOMG](https://jakearchibald.github.io/svgomg/) и аналогичных.

* Растровые изображения оптимизируются сервисами [TinyPNG](https://tinypng.com/), [Compress PNG](https://compresspng.com/) или другие.

* При оптимизации изображений контролируется степень их сжатия, чтобы качество не упало ниже допустимого уровня. Допустимый уровень сжатия определяется опытным путём "на глаз".

### Размер шрифта и высота строки задаётся при помощи единицы измерения `rem`.

```scss
font-size: 1.6rem;
line-height: 2rem;
```

__Внимание:__ для удобной работы необходима предварительная настройка в начальных стилях

```scss
:root {
  font-size: 62.5%;
}
```

Это задаёт базовому шрифту размер 62.5% от размера шрифта по умолчанию браузера (`16px`, если пользователь не переопределил), а `1rem` становится равным `10px`.

Смысл заключается в том, что если пользователь меняет у себя в браузере размер шрифта, то и размер шрифта на сайте автоматически меняется.

## Доступность

### У всех интерактивных элементов при наведении, нажатии или фокусе с клавиатуры есть активное состояние.

Активное состояние интерактивных элементов при нажатии или фокусе с клавиатуры должно оставаться либо встроенным браузерным, либо быть равноценно  переназначено. В таком случае по интерактивным элементам сайта можно  передвигаться с клавиатуры клавишей Tab и видеть каждый текущий элемент в активном состоянии.

Если в макете отсутствует то или иное состояние элемента — требуется сообщить об этом дизайнеру и попросить обновить макет.

### Все интерактивные элементы имеют текстовое описание.

Интерактивные элементы, представленные на макете только графически, без текста,
должны содержать текстовое описание. Тогда при чтении или прослушивании
интерфейса пользователь будет понимать, что произойдёт при нажатии на элемент.

Для того, чтобы контент был скрыт от глаз, но доступен для скринридеров и поисковиков, используется утилитарный класс `visually-hidden`. Так же можно пользоваться атрибутами `aria-label` и `aria-hidden`.

## Vue-шаблоны

### Входные параметры записываются в `camelCase` при определении, но `kebab-case` в шаблонах.

  ```js
  props: {
    greetingText: String,
  }
  ```
  ```html
  <WelcomeMessage greeting-text="hi"/>
  ```
### Названия входных параметров, созданных при помощи макросов `defineProps` и `defineModel` соответствуют стилю, принятому для html-атрибутов.

  * Название входного параметра __не содержит__ префиксов и постфиксов (`is...`, `...List` и т.д.)

  * Названия входных параметров, которые по смыслу соответствуют существующим в html атрибутам записываются буква в букву.

  ```javascript
  // Условный компонент BaseInput.vue
  const props = defineProps({
    // названия похожи на реальные html-атрибуты тега input, но не соответствуют им
    maxLength: {}, // неправильно (конвертируется в max-length)
    minLength: {}, // неправильно (конвертируется в min-length)

    // названия соответствуют реальному html-атрибуту тега input
    maxlength: {}, // правильно
    minlength: {}, // правильно
  });
  ```

### Элементы с большим количеством атрибутов располагаются на нескольких строках, по одному атрибуту на строку, открывающие и закрывающие скобки тегов находятся на одном уровне.

```html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
<MyComponent
  foo="a"
  bar="b"
  baz="c"
  bax="d"
  bay="f"
/>
```

### Шаблоны компонентов содержат только простые выражения, а более комплексные вынесены в вычисляемые свойства или методы.

Неверно:
```html
<p>
  {{
    fullName.split(' ').map((word) => {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }}
</p>
```

Верно:
```html
<p>{{ normalizedFullName }}</p>
```

### Атрибуты единообразно сгруппированы.

Атрибуты указываются [в описанном](styleguide.component-structure.md/#порядок-атрибутов-html-элементов-и-компонентов-в-шаблонах) порядке.

### Всегда используется `key` при наличии `v-for`.

`key` с `v-for` всегда обязателен для компонентов, для поддержания внутреннего состояния компонента и его поддерева. Даже для элементов это хорошая практика для поддержания предсказуемого поведения, такого как консистентности объекта в анимации.

### Не используется `v-if` на том же элементе, что и `v-for`.

### Используется cокращённая запись директив (`:` для `v-bind`, `@` для `v-on`)

### Cтили в компонентах являются глобальными по БЭМ, `scoped` не используется.

### Входные параметры и события являются предпочтительным способом коммуникации между родительским и дочерними компонентами.

__Внимание:__ вместо изменения входных параметров требуется использовать `v-model`.
