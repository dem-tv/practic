import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAME_LABOR_COSTS } from '@/constants/routeNames';

const DepartmentView = () => import('@/views/DepartmentView/DepartmentView.vue');
const USSView = () => import('@/views/USSView/USSView.vue');
const EmployeesView = () => import('@/views/EmployeesView/EmployeesView.vue');
const DesignView = () => import('@/views/DesignView/DesignView.vue');
const ProjectView = () => import('@/views/ProjectView/ProjectView.vue');
const UndervaluedIssuesView = () =>
  import('@/views/UndervaluedIssuesView/UndervaluedIssuesView.vue');

export const laborCostsRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/department',
    name: ROUTE_NAME_LABOR_COSTS.DEPARTMENT,
    component: DepartmentView,
  },
  {
    path: '/uss',
    name: ROUTE_NAME_LABOR_COSTS.USS,
    component: USSView,
  },
  {
    path: '/employees',
    name: ROUTE_NAME_LABOR_COSTS.MANAGEMENT_EMPLOYEES,
    component: EmployeesView,
  },
  {
    path: '/design',
    name: ROUTE_NAME_LABOR_COSTS.DESIGN,
    component: DesignView,
  },
  {
    path: '/projects',
    name: ROUTE_NAME_LABOR_COSTS.PROJECT,
    component: ProjectView,
  },
  {
    path: '/undervalued-issues',
    name: ROUTE_NAME_LABOR_COSTS.UNDERVALUED_ISSUES,
    component: UndervaluedIssuesView,
  },
];
