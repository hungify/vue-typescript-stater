export const objectKeys = <Obj extends Record<string, never>>(obj: Obj): Array<keyof Obj> => {
  return Object.keys(obj) as (keyof Obj)[];
};
