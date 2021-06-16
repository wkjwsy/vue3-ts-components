import { inject } from 'vue'
export const SchemaFormContextKey = Symbol()

export function useVJSFContext() {
  const context: any = inject(SchemaFormContextKey)
  if (!context) {
    throw Error('SchemaForm needed!')
  }
  return context
}
