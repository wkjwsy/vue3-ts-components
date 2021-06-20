import { defineComponent } from '@vue/runtime-core'
import { FieldPropsDefine } from '../types'
import { useVJSFContext } from '../context'
import { Schema } from 'ajv'
import { createUseStyles } from 'vue-jss'
import { PropType } from 'vue'
/**
 * 数组的可能性
 * {
 *  items: { type: string }  单类型
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
const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})
const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      const handleAdd = () => props.onAdd(props.index)
      const handleDelete = () => props.onDelete(props.index)
      const handleUp = () => props.onUp(props.index)
      const handleDown = () => props.onDown(props.index)
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      console.log(111, arr)

      props.onChange(arr)
    }
    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      if (index === 0) {
        return
      }
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) {
        return
      }
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const SchemaItem = context.SchemaItem
      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum
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
                handleArrayItemChange(v, k)
              }}
            />
          )
        })
      } else if (!isSelect) {
        // 单类型
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                value={v}
                key={index}
                rootSchema={rootSchema}
                onChange={(v: any) => {
                  handleArrayItemChange(v, index)
                }}
              />
            </ArrayItemWrapper>
          )
        })
      }
      return <div>he</div>
    }
  },
})
