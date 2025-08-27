export type RemoveMethods<T> = {
  [P in keyof T as T[P] extends (...args: any[]) => any
    ? never
    : P]?: T[P] extends Record<string, any> ? RemoveMethods<T[P]> : T[P];
};
