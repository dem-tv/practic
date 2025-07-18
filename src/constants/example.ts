import type { TableColumn } from '@/types/table.types';

export const exampleList = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

export const projectsList = [
  { id: 1, name: 'Кредитные программы' },
  { id: 2, name: 'Цифровизация услуг' },
];
export const applicationTypes = [
  { id: 1, name: 'Функциональное развитие' },
  { id: 2, name: 'Сопровождение' },
];

export const typeProjectsList = [
  { id: 1, name: 'Инвестиционные проекты' },
  { id: 2, name: 'Кредитные программы' },
  { id: 3, name: 'Цифровизация услуг' },
];
export const statusList = [{ name: 'Ready' }, { name: 'Failure' }, { name: 'Error' }];
export const projectList = [
  { id: 1, name: 'ЭкоФинанс' },
  { id: 2, name: 'Банк для бизнеса' },
  { id: 3, name: 'Инвестиции в стабильность' },
];

export const trackerList = [
  { id: 1, name: 'ToDoist' },
  { id: 2, name: 'TickTick' },
  { id: 3, name: 'BeMob' },
];

export const typeRequestList = [
  { id: 1, name: 'Только Белинвестбанк' },
  { id: 2, name: 'Только проекты эксплуатации' },
  { id: 3, name: 'Выбрать проекты' },
];

export const departmentRows = [
  {
    uid: 1307,
    row_id: 1,
    user_name: 'Барадулькин Игорь',
    spent_hours: 55.00000000000001,
    estimated_hours: 17.5,
    prod_hours: 55.04000000000001,
    id: null,
    support_hours: null,
    full_spent_hours: 55,
    full_prod_hours: 55.04,
  },
  {
    uid: 896,
    row_id: 2,
    user_name: 'Беляковский Владислав',
    spent_hours: 32.3,
    estimated_hours: 274.6,
    prod_hours: 23.54999999999999,
    id: null,
    support_hours: null,
    full_spent_hours: 32.3,
    full_prod_hours: 23.55,
  },
  {
    uid: 1033,
    row_id: 3,
    user_name: 'Вашкевич Вероника',
    spent_hours: 101.85000000000001,
    estimated_hours: 804.7499999999995,
    prod_hours: 203.41000000000008,
    id: 1033,
    support_hours: 9.15,
    full_spent_hours: 111,
    full_prod_hours: 212.56,
  },
  {
    uid: 1433,
    row_id: 4,
    user_name: 'Демчук Татьяна',
    spent_hours: 78.7,
    estimated_hours: 254.05,
    prod_hours: 84.47999999999999,
    id: 1433,
    support_hours: 2,
    full_spent_hours: 80.7,
    full_prod_hours: 86.48,
  },
  {
    uid: 1435,
    row_id: 5,
    user_name: 'Игнатушко Никита',
    spent_hours: 99.7,
    estimated_hours: 153.20000000000005,
    prod_hours: 104.39999999999998,
    id: null,
    support_hours: null,
    full_spent_hours: 99.7,
    full_prod_hours: 104.4,
  },
  {
    uid: 1476,
    row_id: 6,
    user_name: 'Костюченко Сергей',
    spent_hours: 125.55,
    estimated_hours: 285.8,
    prod_hours: 106.00999999999999,
    id: null,
    support_hours: null,
    full_spent_hours: 125.55,
    full_prod_hours: 106.01,
  },
  {
    uid: 1308,
    row_id: 7,
    user_name: 'Кравченко Анна',
    spent_hours: 129.30000000000007,
    estimated_hours: 212.75000000000006,
    prod_hours: 134.3,
    id: null,
    support_hours: null,
    full_spent_hours: 129.3,
    full_prod_hours: 134.3,
  },
  {
    uid: 35,
    row_id: 8,
    user_name: 'Кравченко Денис',
    spent_hours: 78.92,
    estimated_hours: 708.08,
    prod_hours: 167.97000000000003,
    id: 35,
    support_hours: 2.67,
    full_spent_hours: 81.59,
    full_prod_hours: 170.64,
  },
  {
    uid: 1259,
    row_id: 9,
    user_name: 'Крагель Сергей',
    spent_hours: 150.1,
    estimated_hours: 275.63,
    prod_hours: 155.14999999999998,
    id: null,
    support_hours: null,
    full_spent_hours: 150.1,
    full_prod_hours: 155.15,
  },
  {
    uid: 1450,
    row_id: 10,
    user_name: 'Лисицкий Максим',
    spent_hours: 118.50000000000001,
    estimated_hours: 355.1,
    prod_hours: 161.85000000000002,
    id: 1450,
    support_hours: 0.4,
    full_spent_hours: 118.9,
    full_prod_hours: 162.25,
  },
  {
    uid: 1582,
    row_id: 11,
    user_name: 'Лукашенко Дмитрий',
    spent_hours: 149.75000000000003,
    estimated_hours: 150.9,
    prod_hours: 131.72,
    id: null,
    support_hours: null,
    full_spent_hours: 149.75,
    full_prod_hours: 131.72,
  },
  {
    uid: 112,
    row_id: 12,
    user_name: 'Молотков  Павел',
    spent_hours: 109.50000000000003,
    estimated_hours: 292.85,
    prod_hours: 115.48000000000003,
    id: 112,
    support_hours: 25.75,
    full_spent_hours: 135.25,
    full_prod_hours: 141.23,
  },
  {
    uid: 1287,
    row_id: 13,
    user_name: 'Петровский Алексей',
    spent_hours: 52.35,
    estimated_hours: 26.05,
    prod_hours: 58.59,
    id: null,
    support_hours: null,
    full_spent_hours: 52.35,
    full_prod_hours: 58.59,
  },
  {
    uid: 515,
    row_id: 14,
    user_name: 'Рысенков Сергей',
    spent_hours: 50.2,
    estimated_hours: 663.3,
    prod_hours: 56.790000000000006,
    id: 515,
    support_hours: 98,
    full_spent_hours: 148.2,
    full_prod_hours: 154.79,
  },
  {
    uid: 1385,
    row_id: 15,
    user_name: 'Самойлик Алексей',
    spent_hours: 54.95,
    estimated_hours: 108.24999999999999,
    prod_hours: 48.510000000000005,
    id: null,
    support_hours: null,
    full_spent_hours: 54.95,
    full_prod_hours: 48.51,
  },
  {
    uid: 675,
    row_id: 16,
    user_name: 'Хоровец Людмила',
    spent_hours: 114.25,
    estimated_hours: 249.7,
    prod_hours: 117.33,
    id: 675,
    support_hours: 9.75,
    full_spent_hours: 124,
    full_prod_hours: 127.08,
  },
];

export const departmentHeader: TableColumn<(typeof departmentRows)[number]>[] = [
  {
    text: 'Сотрудник, ФИО',
    value: 'user_name',
    sortable: true,
  },
  {
    text: 'Тип трудозатрат',
    value: 'uid',
    format: () => ({
      component: 'CellListVertical',
      arguments: {
        items: ['Разработка', 'Сопровождение', 'Итого'],
      },
    }),
  },
  {
    text: 'Списанное время, часы',
    value: 'spent_hours',
    format: (row) => ({
      component: 'CellListVertical',
      arguments: {
        items: [row.spent_hours || '', row.support_hours || '', row.full_spent_hours || ''],
      },
    }),
  },
  {
    text: 'Оценка трудозатрат, часы',
    value: 'estimated_hours',
    format: (row) => ({
      component: 'CellListVertical',
      arguments: {
        items: [row.estimated_hours || '', '', row.estimated_hours || ''],
      },
    }),
  },
  {
    text: 'Выработка',
    value: 'prod_hours',
    format: (row) => ({
      component: 'CellListVertical',
      arguments: {
        items: [row.prod_hours || '', '', row.full_prod_hours || ''],
      },
    }),
  },
];
