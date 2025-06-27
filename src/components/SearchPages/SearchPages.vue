<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToggle } from '@vueuse/core';

import { accountingNavigation } from '@/constants/accountingNavigation';
import { laborCostsNavigation } from '@/constants/laborCostsNavigation';
import { QMSNavigation } from '@/constants/QMSNavigation';
import { supportNavigation } from '@/constants/supportNavigation';

const searchQuery = ref('');
const [isDropdownOpened, toggleDropdown] = useToggle();

const allNavigation = [
  ...accountingNavigation,
  ...QMSNavigation,
  ...laborCostsNavigation,
  ...supportNavigation,
];

// const pages = allNavigation.map((page) => page.title);

const searchFilter = computed(() => {
  return allNavigation.filter((item) => item.title.toLowerCase().includes(searchQuery.value));
});

watch(searchQuery, (searchValue) => {
  if (searchValue === '' || searchFilter.value.length === 0) {
    isDropdownOpened.value = false;
  } else {
    isDropdownOpened.value = true;
  }
});

function onEscape(evt: Event) {
  if (isDropdownOpened.value) {
    evt.stopPropagation();
    toggleDropdown(false);
  }
}
</script>

<template>
  <DropDown
    ref="dropdown"
    class="search-pages"
    :show="isDropdownOpened"
    @close="toggleDropdown(false)"
    @keydown.esc="onEscape"
  >
    <template #activator>
      <BaseField
        v-model="searchQuery"
        class="search-pages__search-field"
        name="search"
        type="text"
        placeholder="Введите название"
        :resettable="true"
      >
        <template #append>
          <SvgIcon name="search-refraction" />
        </template>
      </BaseField>
    </template>
    <template #dropdown>
      <VerticalList
        class="search-pages__link-list"
        :items="searchFilter"
        key-field="title"
      >
        <template #item="{ item }">
          <NavLink
            class="search-pages__link"
            :to="item.to"
          >
            {{ item.title }}
          </NavLink>
        </template>
      </VerticalList>
    </template>
  </DropDown>
</template>

<style lang="scss" src="../SearchPages/SearchPages.scss"></style>
