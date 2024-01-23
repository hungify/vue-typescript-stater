export const objectKeys = <Obj extends NonNullable<unknown>>(
  obj: Obj,
): Array<keyof Obj> => {
  return Object.keys(obj) as Array<keyof Obj>
}
