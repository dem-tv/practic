import { ROUTE_NAME_QMS } from '@/constants/routeNames';

export const QMSNavigation = [
  {
    title: 'Анализ внутренних возвратов',
    to: { name: ROUTE_NAME_QMS.INTERNAL_TEST_ANALYSIS },
  },
  {
    title: 'Анализ тестирования',
    to: { name: ROUTE_NAME_QMS.TEST_ANALYSIS },
  },
  {
    title: 'Мониторинг исполнения заявок для оценки результативности',
    to: { name: ROUTE_NAME_QMS.APPLICATIONS_PERFORMANCE_EVALUATION },
  },
  {
    title: 'Результативность процесса ОП СМК (сопровождение)',
    to: { name: ROUTE_NAME_QMS.EFFECTIVENESS_PROCESS },
  },
];
