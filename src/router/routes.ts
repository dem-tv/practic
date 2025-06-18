import type { RouteRecordRaw } from 'vue-router';

import {
  ROUTE_NAME_ACCOUNTING,
  ROUTE_NAME_LABOR_COSTS,
  ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
  ROUTE_NAME_INTERNAL_TEST_ANALYSIS,
  ROUTE_NAME_TEST_ANALYSIS,
  ROUTE_NAME_APPLICATIONS_PERFORMANCE_EVALUATION,
  ROUTE_NAME_EFFECTIVENESS_PROCESS,
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
const InternalTestView = () => import('@/views/InternalTestView/InternalTestView.vue');
const TestAnalysisView = () => import('@/views/TestAnalysisView/TestAnalysisView.vue');
const PerformanceEvaluationView = () => import('@/views/PerformanceEvaluationView/PerformanceEvaluationView.vue');
const EffectivenessProcessView = () => import('@/views/EffectivenessProcessView/EffectivenessProcessView.vue');

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
    path: '/internal-test-analysis',
    name: ROUTE_NAME_INTERNAL_TEST_ANALYSIS,
    component: InternalTestView,
  },
  {
    path: '/test-analysis',
    name: ROUTE_NAME_TEST_ANALYSIS,
    component: TestAnalysisView,
  },
  {
    path: '/applications-performance-evaluation',
    name: ROUTE_NAME_APPLICATIONS_PERFORMANCE_EVALUATION,
    component: PerformanceEvaluationView,
  },
  {
    path: '/effectiveness-process-support',
    name: ROUTE_NAME_EFFECTIVENESS_PROCESS,
    component: EffectivenessProcessView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTE_NAME_MAIN },
  },
];
