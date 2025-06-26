import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAME_ACCOUNTING } from '@/constants/routeNames';

const ProjectListViw = () => import('@/views/ProjectListView/ProjectListView.vue');
const Accounting2View = () => import('@/views/Accounting2View/Accounting2View.vue');
const AccountingByDepartmentsView = () =>
  import('@/views/AccountingByDepartmentsView/AccountingByDepartmentsView.vue');

export const accountingRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/project-list',
    name: ROUTE_NAME_ACCOUNTING.PROJECT_LIST,
    component: ProjectListViw,
  },
  {
    path: '/accounting2',
    name: ROUTE_NAME_ACCOUNTING._2,
    component: Accounting2View,
  },
  {
    path: '/accounting-by-departments',
    name: ROUTE_NAME_ACCOUNTING.BY_DEPARTMENTS,
    component: AccountingByDepartmentsView,
  },
];
