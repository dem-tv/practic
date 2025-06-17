export type PeriodListItem<TValue = DateModel | ((format?: string) => DateModel)> = {
  id: string;
  label: string;
  value: TValue;
};

export type DateModel = [string, string] | string | null;

export type DateWithPeriodId = {
  id: string;
  value: DateModel;
};
