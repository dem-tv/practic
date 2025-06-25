import type { RouteRecordRaw } from 'vue-router';

import {
  ROUTE_NAME_ACCOUNTING,
  ROUTE_NAME_ACCOUNTING_2,
  ROUTE_NAME_ACCOUNTING_BY_DEPARTMENTS,
  ROUTE_NAME_ACCOUNTING_PROJECT_LIST,
  ROUTE_NAME_ACT_OF_SUPPORT_BIB,
  ROUTE_NAME_ANALYSIS_TASK_STATUS_CHANGES,
  ROUTE_NAME_ANALYSIS_TASK_STATUS_CHANGESTASKS_RETURNED_AND_RECEIVED_AS_UNFULFILLED_FOR_ONE_PERIOD,
  ROUTE_NAME_ANALYSIS_TASKS,
  ROUTE_NAME_APPLICATIONS_PERFORMANCE_EVALUATION,
  ROUTE_NAME_DEADLINE_CONTROL_SUPPORT_TASKS_EXECUTION,
  ROUTE_NAME_DONE_TASKS_BY_PERIOD,
  ROUTE_NAME_EFFECTIVENESS_PROCESS,
  ROUTE_NAME_EXTRA_TASKS_BY_DATE,
  ROUTE_NAME_INTERNAL_TEST_ANALYSIS,
  ROUTE_NAME_LABOR_COSTS,
  ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
  ROUTE_NAME_LABOR_COSTS_PROJECT,
  ROUTE_NAME_MAIN,
  ROUTE_NAME_QMS,
  ROUTE_NAME_RECEIVED_TASKS_BY_PERIOD,
  ROUTE_NAME_SUPPORT,
  ROUTE_NAME_TASKS_EXTRA_BY_DATE,
  ROUTE_NAME_TASKS_EXTRA_PERIOD,
  ROUTE_NAME_TASKS_RETURNED_AND_RECEIVED_FOR_ONE_PERIOD,
  ROUTE_NAME_TASKS_RETURNED_FOR_REVISION_BY_PERIOD,
  ROUTE_NAME_TEST_ANALYSIS,
  ROUTE_NAME_TESTING,
  ROUTE_NAME_UNFULFILLED_REQUESTS_FOR,
  ROUTE_NAME_UNFULFILLED_REQUESTS_ON_APPRECIATED_AND_UNAPPRECIATED,
  ROUTE_NAME_LABOR_COSTS_UNDERVALUED_ISSUES,
} from '@/constants/routeNames';

const MainView = () => import('@/views/MainView/MainView.vue');
const AccountingView = () => import('@/views/AccountingView/AccountingView.vue');

const GMSView = () => import('@/views/GMSView/GMSView.vue');
const SupportView = () => import('@/views/SupportView/SupportView.vue');
const LaborView = () => import('@/views/LaborView/LaborView.vue');

// Трудозатраты
const DepartmentView = () => import('@/views/DepartmentView/DepartmentView.vue');
const ProjectView = () => import('@/views/ProjectView/ProjectView.vue');
const UndervaluedIssuesView = () => import('@/views/UndervaluedIssuesView/UndervaluedIssuesView.vue');

// Бухгалтерия
const ProjectListViw = () => import('@/views/ProjectListView/ProjectListView.vue');
const Accounting2View = () => import('@/views/Accounting2View/Accounting2View.vue');
const AccountingByDepartmentsView = () =>
  import('@/views/AccountingByDepartmentsView/AccountingByDepartmentsView.vue');


// СМК
const InternalTestView = () => import('@/views/InternalTestView/InternalTestView.vue');
const TestAnalysisView = () => import('@/views/TestAnalysisView/TestAnalysisView.vue');
const PerformanceEvaluationView = () =>
  import('@/views/PerformanceEvaluationView/PerformanceEvaluationView.vue');
const EffectivenessProcessView = () =>
  import('@/views/EffectivenessProcessView/EffectivenessProcessView.vue');

//Сопровождение
const AnalysisTaskStatusChanges = () =>
  import('@/views/AnalysisTaskStatusChanges/AnalysisTaskStatusChanges.vue');
const DoneTasksByPeriod = () => import('@/views/DoneTasksByPeriod/DoneTasksByPeriod.vue');
const ExtraTasksByDate = () => import('@/views/ExtraTasksByDate/ExtraTasksByDate.vue');
const AnalysisTasks = () => import('@/views/AnalysisTasks/AnalysisTasks.vue');
const TasksReturnedAndReceivedForOnePeriod = () =>
  import('@/views/TasksReturnedAndReceivedForOnePeriod/TasksReturnedAndReceivedForOnePeriod.vue');
const TasksReturnedAndReceivedAsUnfulfilledForOnePeriod = () =>
  import(
    '@/views/TasksReturnedAndReceivedAsUnfulfilledForOnePeriod/TasksReturnedAndReceivedAsUnfulfilledForOnePeriod.vue'
  );
const TasksReturnedForRevisionByPeriod = () =>
  import('@/views/TasksReturnedForRevisionByPeriod/TasksReturnedForRevisionByPeriod.vue');
const TasksExtraPeriod = () => import('@/views/TasksExtraPeriod/TasksExtraPeriod.vue');
const DeadlineControlSupportTasksExecution = () =>
  import('@/views/DeadlineControlSupportTasksExecution/DeadlineControlSupportTasksExecution.vue');
const UnfulfilledRequestsFor = () =>
  import('@/views/UnfulfilledRequestsFor/UnfulfilledRequestsFor.vue');
const UnfulfilledRequestsOnAppreciatedAndUnappreciated = () =>
  import(
    '@/views/UnfulfilledRequestsOnAppreciatedAndUnappreciated/UnfulfilledRequestsOnAppreciatedAndUnappreciated.vue'
  );
const ActOfSupportBib = () => import('@/views/ActOfSupportBib/ActOfSupportBib.vue');
const TasksExtraByDate = () => import('@/views/TasksExtraByDate/TasksExtraByDate.vue');
const Testing = () => import('@/views/Testing/Testing.vue');
const ReceivedTasksByPeriod = () => import('@/views/ReceivedTasksByPeriod/ReceivedTasksByPeriod.vue');

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
  // Трудозатраты
  {
    path: '/department',
    name: ROUTE_NAME_LABOR_COSTS_DEPARTMENT,
    component: DepartmentView,
  },
  {
    path: '/projects',
    name: ROUTE_NAME_LABOR_COSTS_PROJECT,
    component: ProjectView,
  },
  {
    path: '/undervalued-issues',
    name: ROUTE_NAME_LABOR_COSTS_UNDERVALUED_ISSUES,
    component: UndervaluedIssuesView,
  },
  // Бухгалтерия
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

  // СМК
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

  //Сопровождение
  {
    path: '/analysis-task-status-changes',
    name: ROUTE_NAME_ANALYSIS_TASK_STATUS_CHANGES,
    component: AnalysisTaskStatusChanges,
  },
  {
    path: '/done-tasks-by-period',
    name: ROUTE_NAME_DONE_TASKS_BY_PERIOD,
    component: DoneTasksByPeriod,
  },
  {
    path: '/extra-tasks-by-date',
    name: ROUTE_NAME_EXTRA_TASKS_BY_DATE,
    component: ExtraTasksByDate,
  },
  {
    path: '/analysis-tasks',
    name: ROUTE_NAME_ANALYSIS_TASKS,
    component: AnalysisTasks,
  },
  {
    path: '/tasks-returned-and-received-for-one-period',
    name: ROUTE_NAME_TASKS_RETURNED_AND_RECEIVED_FOR_ONE_PERIOD,
    component: TasksReturnedAndReceivedForOnePeriod,
  },
  {
    path: '/tasks-returned-and-received-as-unfulfilled-for-one-period',
    name: ROUTE_NAME_ANALYSIS_TASK_STATUS_CHANGESTASKS_RETURNED_AND_RECEIVED_AS_UNFULFILLED_FOR_ONE_PERIOD,
    component: TasksReturnedAndReceivedAsUnfulfilledForOnePeriod,
  },
  {
    path: '/tasks-returned-for-revision-by-period',
    name: ROUTE_NAME_TASKS_RETURNED_FOR_REVISION_BY_PERIOD,
    component: TasksReturnedForRevisionByPeriod,
  },
  {
    path: '/tasks-extra-period',
    name: ROUTE_NAME_TASKS_EXTRA_PERIOD,
    component: TasksExtraPeriod,
  },
  {
    path: '/deadline-control-support-tasks-execution',
    name: ROUTE_NAME_DEADLINE_CONTROL_SUPPORT_TASKS_EXECUTION,
    component: DeadlineControlSupportTasksExecution,
  },
  {
    path: '/unfulfilled-requests-for',
    name: ROUTE_NAME_UNFULFILLED_REQUESTS_FOR,
    component: UnfulfilledRequestsFor,
  },
  {
    path: '/unfulfilled-requests-on-appreciated-and-unappreciated',
    name: ROUTE_NAME_UNFULFILLED_REQUESTS_ON_APPRECIATED_AND_UNAPPRECIATED,
    component: UnfulfilledRequestsOnAppreciatedAndUnappreciated,
  },
  {
    path: '/act-of-support-bib',
    name: ROUTE_NAME_ACT_OF_SUPPORT_BIB,
    component: ActOfSupportBib,
  },
  {
    path: '/tasks-extra-by-date',
    name: ROUTE_NAME_TASKS_EXTRA_BY_DATE,
    component: TasksExtraByDate,
  },
  {
    path: '/testing',
    name: ROUTE_NAME_TESTING,
    component: Testing,
  },
  {
    path: '/received-tasks-by-period',
    name: ROUTE_NAME_RECEIVED_TASKS_BY_PERIOD,
    component: ReceivedTasksByPeriod,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTE_NAME_MAIN },
  },
];
