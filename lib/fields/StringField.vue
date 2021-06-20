<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FieldPropsDefine } from '../types'
export default {
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any): void => {
      props.onChange(e.target.value)
    }
    return { handleChange }
  },
}
</script>
