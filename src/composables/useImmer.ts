import { produce, type Draft } from 'immer';

export type Updater<S> = (draft: Draft<S>) => void;

export function useImmer<T>(baseState: T) {
  const state = shallowRef(baseState);
  const update = (updater: Updater<T>) => {
    state.value = produce(state.value, updater);
  };

  return [state, update] as const;
}
