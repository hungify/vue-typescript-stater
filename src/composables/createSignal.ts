import { shallowRef, triggerRef } from 'vue';

export type Accessor<T> = () => T;

export type Setter<T> = (v?: T | ((prev: T) => T)) => void;

export type Signal<T> = [get: Accessor<T>, set: Setter<T>];

export interface SignalOptions<T> {
  equals?: false | ((prev: T, next: T) => boolean);
}

export function createSignal<T>(value?: T): Signal<T | undefined>;
export function createSignal<T>(value: T, options?: SignalOptions<T>): Signal<T>;
export function createSignal<T>(
  value: T,
  options?: SignalOptions<T | undefined>,
): Signal<T | undefined> {
  const s = shallowRef<T>(value);

  const get = () => s.value;
  const set = (v?: unknown) => {
    s.value = typeof v === 'function' ? v(s.value) : v;
    if (options?.equals === false) triggerRef(s);
  };
  return [get, set];
}
