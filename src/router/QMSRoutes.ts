import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAME_QMS } from '@/constants/routeNames';

const InternalTestView = () => import('@/views/InternalTestView/InternalTestView.vue');
const TestAnalysisView = () => import('@/views/TestAnalysisView/TestAnalysisView.vue');
const PerformanceEvaluationView = () =>
  import('@/views/PerformanceEvaluationView/PerformanceEvaluationView.vue');
const EffectivenessProcessView = () =>
  import('@/views/EffectivenessProcessView/EffectivenessProcessView.vue');

export const QMSRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/internal-test-analysis',
    name: ROUTE_NAME_QMS.INTERNAL_TEST_ANALYSIS,
    component: InternalTestView,
  },
  {
    path: '/test-analysis',
    name: ROUTE_NAME_QMS.TEST_ANALYSIS,
    component: TestAnalysisView,
  },
  {
    path: '/applications-performance-evaluation',
    name: ROUTE_NAME_QMS.APPLICATIONS_PERFORMANCE_EVALUATION,
    component: PerformanceEvaluationView,
  },
  {
    path: '/effectiveness-process-support',
    name: ROUTE_NAME_QMS.EFFECTIVENESS_PROCESS,
    component: EffectivenessProcessView,
  },
];
