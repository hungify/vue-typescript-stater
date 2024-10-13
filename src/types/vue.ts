export interface SyntheticEvent<T = Element, E = Event> extends Event {
  target: EventTarget
  nativeEvent: E
  currentTarget: T & EventTarget
}

export interface InputEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T
}
