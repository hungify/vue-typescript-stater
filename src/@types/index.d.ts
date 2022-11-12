declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log: typeof console.log;
  }
}

export {}; // Important!
