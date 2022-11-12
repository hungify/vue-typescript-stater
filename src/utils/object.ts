export const objectKeys = <Obj extends {}>(obj: Obj): Array<keyof Obj> => {
  return Object.keys(obj) as (keyof Obj)[];
};
