import { defineComponent, inject } from '@vue/runtime-core'
import { FieldPropsDefine } from '../types'
import { SchemaFormContextKey, useVJSFContext } from '../context'
import { isObject } from '../utils'
export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,

  setup(props) {
    const context: any = useVJSFContext()
    console.log(999, context)
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }
    return (props) => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentObject = isObject(value) ? value : {}
      return Object.keys(properties).map((key: string, index: number) => {
        return (
          <SchemaItem
            schema={properties[key]}
            rootSchema={rootSchema}
            value={currentObject[key]}
            key={index}
            onChange={(v: any) => {
              handleObjectFieldChange(key, v)
            }}
          />
        )
      })
    }
  },
})
