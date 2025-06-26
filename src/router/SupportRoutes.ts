import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAME_SUPPORT } from '@/constants/routeNames';

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
const ReceivedTasksByPeriod = () =>
  import('@/views/ReceivedTasksByPeriod/ReceivedTasksByPeriod.vue');

export const SupportRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/analysis-task-status-changes',
    name: ROUTE_NAME_SUPPORT.ANALYSIS_TASK_STATUS_CHANGES,
    component: AnalysisTaskStatusChanges,
  },
  {
    path: '/done-tasks-by-period',
    name: ROUTE_NAME_SUPPORT.DONE_TASKS_BY_PERIOD,
    component: DoneTasksByPeriod,
  },
  {
    path: '/extra-tasks-by-date',
    name: ROUTE_NAME_SUPPORT.EXTRA_TASKS_BY_DATE,
    component: ExtraTasksByDate,
  },
  {
    path: '/analysis-tasks',
    name: ROUTE_NAME_SUPPORT.ANALYSIS_TASKS,
    component: AnalysisTasks,
  },
  {
    path: '/tasks-returned-and-received-for-one-period',
    name: ROUTE_NAME_SUPPORT.TASKS_RETURNED_AND_RECEIVED_FOR_ONE_PERIOD,
    component: TasksReturnedAndReceivedForOnePeriod,
  },
  {
    path: '/tasks-returned-and-received-as-unfulfilled-for-one-period',
    name: ROUTE_NAME_SUPPORT.ANALYSIS_TASK_STATUS_CHANGESTASKS_RETURNED_AND_RECEIVED_AS_UNFULFILLED_FOR_ONE_PERIOD,
    component: TasksReturnedAndReceivedAsUnfulfilledForOnePeriod,
  },
  {
    path: '/tasks-returned-for-revision-by-period',
    name: ROUTE_NAME_SUPPORT.TASKS_RETURNED_FOR_REVISION_BY_PERIOD,
    component: TasksReturnedForRevisionByPeriod,
  },
  {
    path: '/tasks-extra-period',
    name: ROUTE_NAME_SUPPORT.TASKS_EXTRA_PERIOD,
    component: TasksExtraPeriod,
  },
  {
    path: '/deadline-control-support-tasks-execution',
    name: ROUTE_NAME_SUPPORT.DEADLINE_CONTROL_SUPPORT_TASKS_EXECUTION,
    component: DeadlineControlSupportTasksExecution,
  },
  {
    path: '/unfulfilled-requests-for',
    name: ROUTE_NAME_SUPPORT.UNFULFILLED_REQUESTS_FOR,
    component: UnfulfilledRequestsFor,
  },
  {
    path: '/unfulfilled-requests-on-appreciated-and-unappreciated',
    name: ROUTE_NAME_SUPPORT.UNFULFILLED_REQUESTS_ON_APPRECIATED_AND_UNAPPRECIATED,
    component: UnfulfilledRequestsOnAppreciatedAndUnappreciated,
  },
  {
    path: '/act-of-support-bib',
    name: ROUTE_NAME_SUPPORT.ACT_OF_SUPPORT_BIB,
    component: ActOfSupportBib,
  },
  {
    path: '/tasks-extra-by-date',
    name: ROUTE_NAME_SUPPORT.TASKS_EXTRA_BY_DATE,
    component: TasksExtraByDate,
  },
  {
    path: '/testing',
    name: ROUTE_NAME_SUPPORT.TESTING,
    component: Testing,
  },
  {
    path: '/received-tasks-by-period',
    name: ROUTE_NAME_SUPPORT.RECEIVED_TASKS_BY_PERIOD,
    component: ReceivedTasksByPeriod,
  },
];
