import { defineComponent, provide } from 'vue'
import { FieldPropsDefine } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
export default defineComponent({
  name: 'SchemaForm',
  props: FieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const context = {
      SchemaItem,
    }
    provide(SchemaFormContextKey, context)
    return () => {
      const { schema, value } = props

      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  },
})
