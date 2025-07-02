<script setup lang="ts">
// import { computed, ref } from 'vue';
import { useToggle } from '@vueuse/core';

import { reportList } from '@/constants/example';

import { useExampleStore } from '@/stores/useExampleStore';

const LABEL_REPORT = 'Сформированные отчеты';

const [isDropdownOpened, toggleDropdown] = useToggle();
const exampleStore = useExampleStore();

function onEscape(evt: Event) {
  if (isDropdownOpened.value) {
    evt.stopPropagation();
    toggleDropdown(false);
  }
}

const onFieldClick = () => {
  toggleDropdown(true);
};
</script>

<template>
  <DropDown
    ref="dropdown"
    class="reports"
    :ignore="ignore"
    :show="isDropdownOpened"
    @close="toggleDropdown(false)"
    @keydown.esc="onEscape"
  >
    <template #activator>
      <BaseButton @click="onFieldClick">
        <template #default>
          {{ exampleStore.state }}
          {{ exampleStore.uppercase }}
          <SvgIcon name="download" />
        </template>
      </BaseButton>
    </template>
    <template #dropdown>
      <div class="reports-list">
        <p class="reports-list__title">{{ LABEL_REPORT }}</p>
        <VerticalList
          class="reports-list__list"
          :items="reportList"
          key-field="title"
        >
          <template #item="{ item }">
            <div class="reports-list__item">
              <div class="reports-list__item-check-rounded"><SvgIcon name="check-rounded" /></div>
              <div class="reports-list__item-text">
                <div class="reports-list__item-title">{{ item.title }}</div>
                <div class="reports-list__item-subtitle">{{ item.subtitle }}</div>
              </div>
              <div class="reports-list__item-download"><SvgIcon name="download" /></div>
            </div>
          </template>
        </VerticalList>
      </div>
    </template>
  </DropDown>
</template>

<style lang="scss" src="../ReportsList/ReportsList.scss"></style>
