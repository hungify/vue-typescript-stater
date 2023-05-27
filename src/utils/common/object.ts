export function objectKeys<T extends object>(obj: T): Array<keyof T>;
export function objectKeys(obj: NonNullable<unknown>): string[];
export function objectKeys(obj: object): string[] {
  return Object.keys(obj) as string[];
}
