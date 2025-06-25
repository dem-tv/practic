export function getMessageRequired(field: string) {
  return `Поле "${field}" обязательно.`;
}

export function getMessageRequiredIf(currentField: string, unfilledField: string) {
  return `Поле "${currentField}" обязательно для заполнения, когда "${unfilledField}" не указано.`;
}

export function getBannedValueMessage(field: string) {
  return `Значение поля "${field}" находится в списке запретов.`;
}
