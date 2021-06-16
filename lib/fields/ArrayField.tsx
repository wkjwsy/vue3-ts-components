import { defineComponent } from '@vue/runtime-core'
import { FieldPropsDefine } from '../types'
import { useVJSFContext } from '../context'
import { Schema } from 'ajv'
/**
 * 数组的可能性
 * {
 *  items: { type: string }
 * }
 *
 * {
 *  items: [
 *      { type: string },
 *      { type: number }
 *  ]
 * }
 *
 * {
 *  items: { type: string, enum: ['1', '2'] }
 * }
 */
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      console.log(111, arr)

      props.onChange(arr)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const SchemaItem = context.SchemaItem
      const isMultiType = Array.isArray(schema.items)
      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, k: number) => {
          return (
            <SchemaItem
              schema={s}
              key={k}
              value={arr[k]}
              rootSchema={rootSchema}
              onChange={(v: any) => {
                handleMultiTypeChange(v, k)
              }}
            />
          )
        })
      }
      return <div>he</div>
    }
  },
})
