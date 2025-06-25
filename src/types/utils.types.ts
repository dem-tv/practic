export type StringKeys<ObjectType> = Extract<keyof ObjectType, string>;

export type KeyValues<Obj> = Obj[keyof Obj];

export type ArrayElements<ArrayType extends readonly string[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// Вспомогательный тип для PathsToDeepFields
type PathsToRestFields<Obj> =
  Obj extends Record<string, unknown> ? `.${PathsToDeepFields<Obj>}` : '';

// Тип возвращает литералы, содержащие пути ко всем внутренним полям объекта, разделенным точкой, например:
// {a: {b: ''}, c: ''}} вернет 'a.b' | 'c'
export type PathsToDeepFields<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: `${string & Key}${PathsToRestFields<Obj[Key]>}`;
}[keyof Obj];

// Позволяет получить ключи только к строковым и числовым полям в объекте.
export type StringNumberKeys<Type> = {
  [Keys in keyof Type]: Type[Keys] extends string | number ? Keys : never;
}[keyof Type];
