import type { RouteRecordRaw } from 'vue-router';

import {
  ROUTE_NAME_ACCOUNTING,
  ROUTE_NAME_LABOR_COSTS,
  ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
  ROUTE_NAME_MAIN,
  ROUTE_NAME_QMS,
  ROUTE_NAME_SUPPORT,
  ROUTE_NAME_ACCOUNTING_PROJECT_LIST,
  ROUTE_NAME_ACCOUNTING_2,
  ROUTE_NAME_ACCOUNTING_BY_DEPARTMENTS,
  ROUTE_NAME_LABOR_COSTS_UNDERVALUED_ISSUES,
} from '@/constants/routeNames';

const MainView = () => import('@/views/MainView/MainView.vue');
const AccountingView = () => import('@/views/AccountingView/AccountingView.vue');
const GMSView = () => import('@/views/GMSView/GMSView.vue');
const SupportView = () => import('@/views/SupportView/SupportView.vue');
const LaborView = () => import('@/views/LaborView/LaborView.vue');
const DepartmentView = () => import('@/views/DepartmentView/DepartmentView.vue');
const ProjectListViw = () => import('@/views/ProjectListView/ProjectListView.vue');
const Accounting2View = () => import('@/views/Accounting2View/Accounting2View.vue');
const AccountingByDepartmentsView = () => import('@/views/AccountingByDepartmentsView/AccountingByDepartmentsView.vue');
const UndervaluedIssuesView = () => import('@/views/UndervaluedIssuesView/UndervaluedIssuesView.vue');
export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: ROUTE_NAME_MAIN,
    component: MainView,
    redirect: {
      name: ROUTE_NAME_SUPPORT,
    },
    children: [
      {
        path: '/support',
        name: ROUTE_NAME_SUPPORT,
        component: SupportView,
      },
      {
        path: '/gms',
        name: ROUTE_NAME_QMS,
        component: GMSView,
      },
      {
        path: '/labor-costs',
        name: ROUTE_NAME_LABOR_COSTS,
        component: LaborView,
      },
      {
        path: '/accounting',
        name: ROUTE_NAME_ACCOUNTING,
        component: AccountingView,
      },
    ],
  },
  {
    path: '/department',
    name: ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
    component: DepartmentView,
  },
  {
    path: '/undervalued-issues',
    name: ROUTE_NAME_LABOR_COSTS_UNDERVALUED_ISSUES,
    component: UndervaluedIssuesView,
  },
  {
    path: '/project-list',
    name: ROUTE_NAME_ACCOUNTING_PROJECT_LIST,
    component: ProjectListViw,
  },
  {
    path: '/accounting2',
    name: ROUTE_NAME_ACCOUNTING_2,
    component: Accounting2View,
  },
  {
    path: '/accounting-by-departments',
    name: ROUTE_NAME_ACCOUNTING_BY_DEPARTMENTS,
    component: AccountingByDepartmentsView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTE_NAME_MAIN },
  },
];
