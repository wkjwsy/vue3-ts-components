<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FieldPropsDefine, Schema } from '../types'
export default {
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      let num = Number(e.target.value)
      props.onChange(num)
    }
    return { handleChange }
  },
}
</script>
