export type LooseAutoComplete<T> = T | ({} & string)

export type Prettify<T> = {
  [KeyType in keyof T]: T[KeyType] extends object
    ? Prettify<T[KeyType]>
    : T[KeyType]
} & {}

export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never
}[keyof T]

export type DeepKeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition
    ? K
    : T[K] extends object
      ? `${K & string}.${DeepKeysOfValue<T[K], TCondition> & string}`
      : never
}[keyof T]
