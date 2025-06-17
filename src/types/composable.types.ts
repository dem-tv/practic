import type { ComputedRef, Ref, WritableComputedRef } from 'vue';

export type ComposableProp<T> = T | (() => T) | Ref<T> | ComputedRef<T>;
export type WritableComposableProp<T> = T | Ref<T> | WritableComputedRef<T>;
