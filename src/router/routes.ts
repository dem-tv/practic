import type { RouteRecordRaw } from 'vue-router';

import { accountingRoutes } from './accountingRoutes';
import { laborCostsRoutes } from './laborCostsRoutes';
import { QMSRoutes } from './QMSRoutes';
import { supportRoutes } from './supportRoutes';

import {
  ROUTE_NAME_ACCOUNTING,
  ROUTE_NAME_LABOR_COSTS,
  ROUTE_NAME_MAIN,
  ROUTE_NAME_QMS,
  ROUTE_NAME_SUPPORT,
} from '@/constants/routeNames';

const MainView = () => import('@/views/MainView/MainView.vue');

const AccountingView = () => import('@/views/AccountingView/AccountingView.vue');
const GMSView = () => import('@/views/GMSView/GMSView.vue');
const SupportView = () => import('@/views/SupportView/SupportView.vue');
const LaborView = () => import('@/views/LaborView/LaborView.vue');

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: ROUTE_NAME_MAIN,
    component: MainView,
    redirect: {
      name: ROUTE_NAME_SUPPORT.MAIN,
    },
    children: [
      {
        path: '/support',
        name: ROUTE_NAME_SUPPORT.MAIN,
        component: SupportView,
      },
      {
        path: '/gms',
        name: ROUTE_NAME_QMS.MAIN,
        component: GMSView,
      },
      {
        path: '/labor-costs',
        name: ROUTE_NAME_LABOR_COSTS.MAIN,
        component: LaborView,
      },
      {
        path: '/accounting',
        name: ROUTE_NAME_ACCOUNTING.MAIN,
        component: AccountingView,
      },
    ],
  },
  ...laborCostsRoutes,
  ...accountingRoutes,
  ...QMSRoutes,
  ...supportRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTE_NAME_MAIN },
  },
];
