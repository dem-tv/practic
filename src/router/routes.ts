import type { RouteRecordRaw } from 'vue-router';

import {
  ROUTE_NAME_ACCOUNTING,
  ROUTE_NAME_LABOR_COSTS,
  ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
  ROUTE_NAME_LABOR_COSTS_DESIGN,
  ROUTE_NAME_MAIN,
  ROUTE_NAME_QMS,
  ROUTE_NAME_SUPPORT,
} from '@/constants/routeNames';

const MainView = () => import('@/views/MainView/MainView.vue');
const AccountingView = () => import('@/views/AccountingView/AccountingView.vue');
const GMSView = () => import('@/views/GMSView/GMSView.vue');
const SupportView = () => import('@/views/SupportView/SupportView.vue');
const LaborView = () => import('@/views/LaborView/LaborView.vue');
const DepartmentView = () => import('@/views/DepartmentView/DepartmentView.vue');
const DesignView = () => import('@/views/DesignView/DesignView.vue');
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
    path: '/design',
    name: ROUTE_NAME_LABOR_COSTS_DESIGN,
    component: DesignView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTE_NAME_MAIN },
  },
];
