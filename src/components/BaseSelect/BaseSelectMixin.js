import { flattenOptions, flow, includes, isEmpty, not, stripGroups } from './BaseSelectUtils';

export default {
  data() {
    return {
      search: '',
      isOpen: false,
      preferredOpenDirection: 'below',
      optimizedHeight: this.maxHeight,
    };
  },
  mounted() {
    /* istanbul ignore else */
    if (!this.multiple && this.max) {
      console.warn(
        '[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false.',
      );
    }
    if (this.preselectFirst && !this.internalValue.length && this.options.length) {
      this.select(this.filteredOptions[0]);
    }
  },
  computed: {
    internalValue() {
      return this.modelValue || this.modelValue === 0
        ? Array.isArray(this.modelValue)
          ? this.modelValue
          : [this.modelValue]
        : [];
    },
    filteredOptions() {
      const search = this.search || '';
      const normalizedSearch = search.toLowerCase().trim();

      let options = this.options.concat();

      /* istanbul ignore else */
      if (this.internalSearch) {
        options = this.groupValues
          ? this.filterAndFlat(options, normalizedSearch, this.label)
          : this.filterOptions(options, normalizedSearch, this.label, this.customLabel);
      } else {
        options = this.groupValues
          ? flattenOptions(this.groupValues, this.groupLabel)(options)
          : options;
      }

      options = this.hideSelected ? options.filter(not(this.isSelected)) : options;

      /* istanbul ignore else */
      if (this.taggable && normalizedSearch.length && !this.isExistingOption(normalizedSearch)) {
        if (this.tagPosition === 'bottom') {
          options.push({ isTag: true, label: search });
        } else {
          options.unshift({ isTag: true, label: search });
        }
      }

      return options.slice(0, this.optionsLimit);
    },
    valueKeys() {
      if (this.trackBy) {
        return this.internalValue.map((element) => element[this.trackBy]);
      }
      return this.internalValue;
    },
    optionKeys() {
      const options = this.groupValues ? this.flatAndStrip(this.options) : this.options;
      return options.map((element) =>
        this.customLabel(element, this.label).toString().toLowerCase(),
      );
    },
    currentOptionLabel() {
      return this.multiple
        ? this.searchable
          ? ''
          : this.placeholder
        : this.internalValue.length
          ? this.getOptionLabel(this.internalValue[0])
          : this.searchable
            ? ''
            : this.placeholder;
    },
  },
  watch: {
    internalValue: {
      handler() {
        /* istanbul ignore else */
        if (this.resetAfter && this.internalValue.length) {
          this.search = '';
          this.$emit('update:modelValue', this.multiple ? [] : null);
        }
      },
      deep: true,
    },
    search() {
      this.$emit('search-change', this.search);
    },
  },
  emits: ['open', 'search-change', 'close', 'select', 'update:modelValue', 'remove', 'tag'],
  methods: {
    /**
     * Returns the internalValue in a way it can be emited to the parent
     * @returns {Object||Array||String||Integer}
     */
    getValue() {
      return this.multiple
        ? this.internalValue
        : this.internalValue.length === 0
          ? null
          : this.internalValue[0];
    },
    /**
     * Filters and then flattens the options list
     * @param  {Array}
     * @return {Array} returns a filtered and flat options list
     */
    filterAndFlat(options, search, label) {
      return flow(
        this.filterGroups(search, label, this.groupValues, this.groupLabel, this.customLabel),
        flattenOptions(this.groupValues, this.groupLabel),
      )(options);
    },
    /**
     * Flattens and then strips the group labels from the options list
     * @param  {Array}
     * @return {Array} returns a flat options list without group labels
     */
    flatAndStrip(options) {
      return flow(flattenOptions(this.groupValues, this.groupLabel), stripGroups)(options);
    },
    /**
     * Updates the search value
     * @param  {String}
     */
    updateSearch(query) {
      this.search = query;
    },
    /**
     * Finds out if the given query is already present
     * in the available options
     * @param  {String}
     * @return {Boolean} returns true if element is available
     */
    isExistingOption(query) {
      return !this.options ? false : this.optionKeys.indexOf(query) > -1;
    },
    /**
     * Finds out if the given element is already present
     * in the result value
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is selected
     */
    isSelected(option) {
      const opt = this.trackBy ? option[this.trackBy] : option;
      return this.valueKeys.indexOf(opt) > -1;
    },
    /**
     * Finds out if the given option is disabled
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is disabled
     */
    isOptionDisabled(option) {
      return !!option.$isDisabled;
    },
    /**
     * Returns empty string when options is null/undefined
     * Returns tag query if option is tag.
     * Returns the customLabel() results and casts it to string.
     *
     * @param  {Object||String||Integer} Passed option
     * @returns {Object||String}
     */
    getOptionLabel(option) {
      if (isEmpty(option)) return '';
      /* istanbul ignore else */
      if (option.isTag) return option.label;
      /* istanbul ignore else */
      if (option.$isLabel) return option.$groupLabel;

      const label = this.customLabel(option, this.label);
      /* istanbul ignore else */
      if (isEmpty(label)) return '';
      return label;
    },
    /**
     * Add the given option to the list of selected options
     * or sets the option as the selected option.
     * If option is already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} option to select/deselect
     * @param  {Boolean} block removing
     */
    select(option, key) {
      /* istanbul ignore else */
      if (option.$isLabel && this.groupSelect) {
        this.selectGroup(option);
        return;
      }
      if (
        this.blockKeys.indexOf(key) !== -1 ||
        this.disabled ||
        option.$isDisabled ||
        option.$isLabel
      )
        return;
      /* istanbul ignore else */
      if (this.max && this.multiple && this.internalValue.length === this.max) return;
      /* istanbul ignore else */
      if (key === 'Tab' && !this.pointerDirty) return;
      if (option.isTag) {
        this.$emit('tag', option.label, this.id);
        this.search = '';
        if (this.closeOnSelect && !this.multiple) this.deactivate();
      } else {
        const isSelected = this.isSelected(option);

        if (isSelected) {
          if (key !== 'Tab') this.removeElement(option);
          return;
        }

        if (this.multiple) {
          this.$emit('update:modelValue', this.internalValue.concat([option]));
        } else {
          this.$emit('update:modelValue', option);
        }

        this.$emit('select', option, this.id);

        /* istanbul ignore else */
        if (this.clearOnSelect) this.search = '';
      }
      /* istanbul ignore else */
      if (this.closeOnSelect) this.deactivate();
    },
    /**
     * Add the given group options to the list of selected options
     * If all group optiona are already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} group to select/deselect
     */
    selectGroup(selectedGroup) {
      const group = this.options.find((option) => {
        return option[this.groupLabel] === selectedGroup.$groupLabel;
      });

      if (!group) return;

      if (this.wholeGroupSelected(group)) {
        this.$emit('remove', group[this.groupValues], this.id);

        const groupValues = this.trackBy
          ? group[this.groupValues].map((val) => val[this.trackBy])
          : group[this.groupValues];
        const newValue = this.internalValue.filter(
          (option) => groupValues.indexOf(this.trackBy ? option[this.trackBy] : option) === -1,
        );

        this.$emit('update:modelValue', newValue);
      } else {
        const optionsToAdd = group[this.groupValues].filter(
          (option) => !(this.isOptionDisabled(option) || this.isSelected(option)),
        );

        // if max is defined then just select options respecting max
        if (this.max) {
          optionsToAdd.splice(this.max - this.internalValue.length);
        }

        this.$emit('select', optionsToAdd, this.id);
        this.$emit('update:modelValue', this.internalValue.concat(optionsToAdd));
      }

      if (this.closeOnSelect) this.deactivate();
    },
    /**
     * Helper to identify if all values in a group are selected
     *
     * @param {Object} group to validated selected values against
     */
    wholeGroupSelected(group) {
      return group[this.groupValues].every(
        (option) => this.isSelected(option) || this.isOptionDisabled(option),
      );
    },
    /**
     * Helper to identify if all values in a group are disabled
     *
     * @param {Object} group to check for disabled values
     */
    wholeGroupDisabled(group) {
      return group[this.groupValues].every(this.isOptionDisabled);
    },
    /**
     * Removes the given option from the selected options.
     * Additionally checks this.allowEmpty prop if option can be removed when
     * it is the last selected option.
     *
     * @param  {type} option description
     * @return {type}        description
     */
    removeElement(option, shouldClose = true) {
      /* istanbul ignore else */
      if (this.disabled) return;
      /* istanbul ignore else */
      if (option.$isDisabled) return;
      /* istanbul ignore else */
      if (!this.allowEmpty && this.internalValue.length <= 1) {
        this.deactivate();
        return;
      }

      const index =
        typeof option === 'object'
          ? this.valueKeys.indexOf(option[this.trackBy])
          : this.valueKeys.indexOf(option);

      if (this.multiple) {
        const newValue = this.internalValue
          .slice(0, index)
          .concat(this.internalValue.slice(index + 1));
        this.$emit('update:modelValue', newValue);
      } else {
        this.$emit('update:modelValue', null);
      }
      this.$emit('remove', option, this.id);

      /* istanbul ignore else */
      if (this.closeOnSelect && shouldClose) this.deactivate();
    },
    /**
     * Calls this.removeElement() with the last element
     * from this.internalValue (selected element Array)
     *
     * @fires this#removeElement
     */
    removeLastElement() {
      /* istanbul ignore else */
      if (this.blockKeys.indexOf('Delete') !== -1) return;
      /* istanbul ignore else */
      if (
        this.search.length === 0 &&
        Array.isArray(this.internalValue) &&
        this.internalValue.length
      ) {
        this.removeElement(this.internalValue[this.internalValue.length - 1], false);
      }
    },
    /**
     * Opens the multiselect’s dropdown.
     * Sets this.isOpen to TRUE
     */
    activate() {
      /* istanbul ignore else */
      if (this.isOpen || this.disabled) return;

      this.adjustPosition();
      /* istanbul ignore else  */
      if (this.groupValues && this.pointer === 0 && this.filteredOptions.length) {
        this.pointer = 1;
      }

      this.isOpen = true;
      /* istanbul ignore else  */
      if (this.searchable) {
        if (!this.preserveSearch) this.search = '';
        if (!this.preventAutofocus)
          this.$nextTick(() => this.$refs.search && this.$refs.search.focus());
      } else if (!this.preventAutofocus) {
        if (typeof this.$el !== 'undefined') this.$el.focus();
      }
      this.$emit('open', this.id);
    },
    /**
     * Closes the multiselect’s dropdown.
     * Sets this.isOpen to FALSE
     */
    deactivate() {
      /* istanbul ignore else */
      if (!this.isOpen) return;

      this.isOpen = false;
      /* istanbul ignore else  */
      if (this.searchable) {
        if (this.$refs.search !== null && typeof this.$refs.search !== 'undefined')
          this.$refs.search.blur();
      } else {
        if (typeof this.$el !== 'undefined') this.$el.blur();
      }
      if (!this.preserveSearch) this.search = '';
      this.$emit('close', this.getValue(), this.id);
    },
    /**
     * Call this.activate() or this.deactivate()
     * depending on this.isOpen value.
     *
     * @fires this#activate || this#deactivate
     * @property {Boolean} isOpen indicates if dropdown is open
     */
    toggle() {
      if (this.isOpen) {
        this.deactivate();
        return;
      }

      this.activate();
    },
    /**
     * Updates the hasEnoughSpace variable used for
     * detecting where to expand the dropdown
     */
    adjustPosition() {
      if (typeof window === 'undefined') return;

      const spaceAbove = this.$el.getBoundingClientRect().top;
      const spaceBelow = window.innerHeight - this.$el.getBoundingClientRect().bottom;
      const hasEnoughSpaceBelow = spaceBelow > this.maxHeight;

      if (
        hasEnoughSpaceBelow ||
        spaceBelow > spaceAbove ||
        this.openDirection === 'below' ||
        this.openDirection === 'bottom'
      ) {
        this.preferredOpenDirection = 'below';
        this.optimizedHeight = Math.min(spaceBelow - 40, this.maxHeight);
      } else {
        this.preferredOpenDirection = 'above';
        this.optimizedHeight = Math.min(spaceAbove - 40, this.maxHeight);
      }
    },
    /**
     * Filters and sorts the options ready for selection
     * @param {Array} options
     * @param {String} search
     * @param {String} label
     * @param {Function} customLabel
     * @returns {Array}
     */
    filterOptions(options, search, label, customLabel) {
      return search
        ? options
            .filter((option) => includes(customLabel(option, label), search))
            .sort((a, b) => {
              if (typeof this.filteringSortFunc === 'function') {
                return this.filteringSortFunc(a, b);
              }
              return customLabel(a, label).length - customLabel(b, label).length;
            })
        : options;
    },
    /**
     *
     * @param {String} search
     * @param {String} label
     * @param {String} values
     * @param {String} groupLabel
     * @param {function} customLabel
     * @returns {function(*): *}
     */
    filterGroups(search, label, values, groupLabel, customLabel) {
      return (groups) =>
        groups.map((group) => {
          /* istanbul ignore else */
          if (!group[values]) {
            console.warn(
              'Options passed to base-select do not contain groups, despite the config.',
            );
            return [];
          }
          const groupOptions = this.filterOptions(group[values], search, label, customLabel);

          return groupOptions.length
            ? {
                [groupLabel]: group[groupLabel],
                [values]: groupOptions,
              }
            : [];
        });
    },
  },
};
