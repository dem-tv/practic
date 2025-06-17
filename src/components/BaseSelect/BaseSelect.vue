<template>
  <div
    :tabindex="searchable ? -1 : tabindex"
    :class="{
      'base-select--active': isOpen,
      'base-select--disabled': disabled,
      'base-select--above': isAbove,
      'base-select--has-options-group': hasOptionGroup,
    }"
    class="base-select"
    role="combobox"
    :aria-expanded="isOpen"
    :aria-owns="'listbox-' + id"
    :aria-activedescendant="isOpen && pointer !== null ? id + '-' + pointer : null"
    @focus="activate()"
    @blur="searchable ? false : deactivate()"
    @keydown.self.down.prevent="pointerForward()"
    @keydown.self.up.prevent="pointerBackward()"
    @keypress.enter.tab.stop.self="addPointerElement($event)"
    @keyup.esc="deactivate()"
  >
    <slot
      name="caret"
      :toggle="toggle"
    >
      <div
        class="base-select__select"
        @mousedown.prevent.stop="toggle()"
      >
        <SvgIcon
          name="chevron"
          class="base-select__select-icon"
        />
      </div>
    </slot>
    <slot
      name="clear"
      :search="search"
    ></slot>
    <div
      ref="tags"
      class="base-select__tags"
    >
      <slot
        name="selection"
        :search="search"
        :remove="removeElement"
        :values="visibleValues"
        :is-open="isOpen"
      >
        <div
          v-show="visibleValues.length > 0"
          class="base-select__tags-wrap"
        >
          <template v-for="(option, index) of visibleValues">
            <slot
              name="tag"
              :option="option"
              :search="search"
              :remove="removeElement"
            >
              <span
                :key="index"
                class="base-select__tag"
                @mousedown.prevent
              >
                <span v-text="getOptionLabel(option)"></span>
                <i
                  tabindex="1"
                  class="base-select__tag-icon"
                  @keypress.enter.prevent="removeElement(option)"
                  @mousedown.prevent="removeElement(option)"
                ></i>
              </span>
            </slot>
          </template>
        </div>
        <template v-if="internalValue && internalValue.length > limit">
          <slot name="limit">
            <strong
              class="base-select__strong"
              v-text="limitText(internalValue.length - limit)"
            />
          </slot>
        </template>
      </slot>
      <transition name="base-select__loading">
        <slot name="loading">
          <div
            v-show="loading"
            class="base-select__spinner"
          />
        </slot>
      </transition>
      <input
        v-if="searchable"
        :id="id"
        ref="search"
        :name="name"
        type="text"
        autocomplete="off"
        :spellcheck="spellcheck"
        :placeholder="placeholder"
        :required="isRequired"
        :style="inputStyle"
        :value="search"
        :disabled="disabled"
        :tabindex="tabindex"
        :aria-label="name + '-searchbox'"
        class="base-select__input"
        :aria-controls="'listbox-' + id"
        @input="updateSearch($event.target.value)"
        @focus.prevent="activate()"
        @blur.prevent="deactivate()"
        @keyup.esc="deactivate()"
        @keydown.down.prevent="pointerForward()"
        @keydown.up.prevent="pointerBackward()"
        @keypress.enter.prevent.stop.self="addPointerElement($event)"
        @keydown.delete.stop="removeLastElement()"
      />
      <span
        v-if="isSingleLabelVisible"
        class="base-select__single"
        @mousedown.prevent="toggle"
      >
        <slot
          name="singleLabel"
          :option="singleValue"
        >
          {{ currentOptionLabel }}
        </slot>
      </span>
      <span
        v-if="isPlaceholderVisible"
        class="base-select__placeholder"
        @mousedown.prevent="toggle"
      >
        <slot name="placeholder">
          {{ placeholder }}
        </slot>
      </span>
    </div>
    <transition name="base-select">
      <div
        v-show="isOpen"
        ref="list"
        class="base-select__content-wrapper"
        tabindex="-1"
        :style="{ maxHeight: optimizedHeight + 'px' }"
        @focus="activate"
        @mousedown.prevent
      >
        <ul
          :id="'listbox-' + id"
          class="base-select__content"
          :style="contentStyle"
          role="listbox"
          :aria-base-selectable="multiple"
        >
          <slot name="beforeList"></slot>
          <li v-if="multiple && max === internalValue.length">
            <span class="base-select__option">
              <slot name="maxElements"
                >Maximum of {{ max }} options selected. First remove a selected option to select
                another.</slot
              >
            </span>
          </li>
          <template v-if="!max || internalValue.length < max">
            <li
              v-for="(option, index) of filteredOptions"
              :id="id + '-' + index"
              :key="index"
              class="base-select__element"
              :aria-selected="isSelected(option)"
              :role="!(option && (option.$isLabel || option.$isDisabled)) ? 'option' : null"
            >
              <span
                v-if="!(option && (option.$isLabel || option.$isDisabled))"
                :class="optionHighlight(index, option)"
                :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
                :data-selected="selectedLabelText"
                :data-deselect="deselectLabelText"
                class="base-select__option"
                @click.stop="select(option)"
                @mouseenter.self="pointerSet(index)"
              >
                <slot
                  name="option"
                  :option="option"
                  :search="search"
                  :index="index"
                >
                  <span>{{ getOptionLabel(option) }}</span>
                </slot>
              </span>
              <span
                v-if="option && (option.$isLabel || option.$isDisabled)"
                :data-select="groupSelect && selectGroupLabelText"
                :data-deselect="groupSelect && deselectGroupLabelText"
                :class="groupHighlight(index, option)"
                class="base-select__option"
                @mouseenter.self="groupSelect && pointerSet(index)"
                @mousedown.prevent="selectGroup(option)"
              >
                <slot
                  name="option"
                  :option="option"
                  :search="search"
                  :index="index"
                >
                  <span>{{ getOptionLabel(option) }}</span>
                </slot>
              </span>
            </li>
          </template>
          <li v-show="showNoResults && filteredOptions.length === 0 && search && !loading">
            <span class="base-select__option">
              <slot
                name="noResult"
                :search="search"
                >Список пуст</slot
              >
            </span>
          </li>
          <li
            v-show="
              showNoOptions &&
              (options.length === 0 || (hasOptionGroup === true && filteredOptions.length === 0)) &&
              !search &&
              !loading
            "
          >
            <span class="base-select__option">
              <slot name="noOptions">List is empty.</slot>
            </span>
          </li>
          <slot name="afterList"></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<!--eslint-disable-next-line vue/block-lang-->
<script lang="js">
import selectMixin from './BaseSelectMixin';
import pointerMixin from './pointerMixin';

export default {
  name: 'BaseSelect',
  mixins: [selectMixin, pointerMixin],
  compatConfig: {
    MODE: 3,
    ATTR_ENUMERATED_COERCION: false,
  },
  props: {
    /**
     * name attribute to match optional label element
     * @default ''
     * @type {String}
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Presets the selected options value.
     * @type {Object||Array||String||Integer}
     */
    modelValue: {
      type: null,
      default() {
        return [];
      },
    },
    /**
     * String to show when pointing to an option
     * @default 'Нажмите Enter для выбора'
     * @type {String}
     */
    selectLabel: {
      type: String,
      default: 'Нажмите Enter для выбора',
    },
    /**
     * String to show when pointing to an option
     * @default 'Нажмите Enter для выбора группы'
     * @type {String}
     */
    selectGroupLabel: {
      type: String,
      default: 'Нажмите Enter для выбора группы',
    },
    /**
     * String to show next to selected option
     * @default 'Выбрано'
     * @type {String}
     */
    selectedLabel: {
      type: String,
      default: 'Выбрано',
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Нажмите Enter для удаления'
     * @type {String}
     */
    deselectLabel: {
      type: String,
      default: 'Нажмите Enter для удаления',
    },
    /**
     * String to show when pointing to an already selected option
     * @default 'Press enter to remove'
     * @type {String}
     */
    deselectGroupLabel: {
      type: String,
      default: 'Press enter to deselect group',
    },
    /**
     * Decide whether to show pointer labels
     * @default true
     * @type {Boolean}
     */
    showLabels: {
      type: Boolean,
      default: true,
    },
    /**
     * Limit the display of selected options. The rest will be hidden within the limitText string.
     * @default 99999
     * @type {Integer}
     */
    limit: {
      type: Number,
      default: 99999,
    },
    /**
     * Sets maxHeight style value of the dropdown
     * @default 300
     * @type {Integer}
     */
    maxHeight: {
      type: Number,
      default: 300,
    },
    /**
     * Function that process the message shown when selected
     * elements pass the defined limit.
     * @default 'and * more'
     * @param {Int} count Number of elements more than limit
     * @type {Function}
     */
    limitText: {
      type: Function,
      default: (count) => `and ${count} more`,
    },
    /**
     * Set true to trigger the loading spinner.
     * @default False
     * @type {Boolean}
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * Disables the multiselect if true.
     * @default false
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Enables search input's spellcheck if true.
     * @default false
     * @type {Boolean}
     */
    spellcheck: {
      type: Boolean,
      default: false,
    },
    /**
     * Fixed opening direction
     * @default ''
     * @type {String}
     */
    openDirection: {
      type: String,
      default: '',
    },
    /**
     * Shows slot with message about empty options
     * @default true
     * @type {Boolean}
     */
    showNoOptions: {
      type: Boolean,
      default: true,
    },
    showNoResults: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    /**
     * Adds Required attribute to the input element when there is no value selected
     * @default false
     * @type {Boolean}
     */
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasOptionGroup() {
      return this.groupValues && this.groupLabel && this.groupSelect;
    },
    isSingleLabelVisible() {
      return (
        (this.singleValue || this.singleValue === 0) &&
        (!this.isOpen || !this.searchable) &&
        !this.visibleValues.length
      );
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && (!this.searchable || !this.isOpen);
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0];
    },
    deselectLabelText() {
      return this.showLabels ? this.deselectLabel : '';
    },
    deselectGroupLabelText() {
      return this.showLabels ? this.deselectGroupLabel : '';
    },
    selectLabelText() {
      return this.showLabels ? this.selectLabel : '';
    },
    selectGroupLabelText() {
      return this.showLabels ? this.selectGroupLabel : '';
    },
    selectedLabelText() {
      return this.showLabels ? this.selectedLabel : '';
    },
    inputStyle() {
      if (this.searchable || (this.multiple && this.modelValue && this.modelValue.length)) {
        // Hide input by setting the width to 0 allowing it to receive focus
        return this.isOpen ? { width: '100%' } : { width: '0', position: 'absolute', padding: '0' };
      }
      return '';
    },
    contentStyle() {
      return this.options.length ? { display: 'inline-block' } : { display: 'block' };
    },
    isAbove() {
      if (this.openDirection === 'above' || this.openDirection === 'top') {
        return true;
      }
      if (this.openDirection === 'below' || this.openDirection === 'bottom') {
        return false;
      }
      return this.preferredOpenDirection === 'above';
    },
    showSearchInput() {
      return (
        this.searchable &&
        (this.hasSingleSelectedSlot && (this.visibleSingleValue || this.visibleSingleValue === 0)
          ? this.isOpen
          : true)
      );
    },
    isRequired() {
      if (this.required === false) {
        return false;
      }
      // if we have a value, any value, then this isn't required
      return this.internalValue.length <= 0;
    },
  },
};
</script>

<style lang="scss" src="./BaseSelect.scss" />
