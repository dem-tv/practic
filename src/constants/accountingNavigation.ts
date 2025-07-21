import { ROUTE_NAME_ACCOUNTING } from '@/constants/routeNames';

export const accountingNavigation = [
  {
    title: 'Список проектов',
    to: { name: ROUTE_NAME_ACCOUNTING.PROJECT_LIST },
  },
  {
    title: 'Трудозатраты для бухгалтерии',
    to: { name: ROUTE_NAME_ACCOUNTING._2 },
  },
  {
    title: 'Трудозатраты для бухгалтерии в разрезе подразделений',
    to: { name: ROUTE_NAME_ACCOUNTING.BY_DEPARTMENTS },
  },
];
