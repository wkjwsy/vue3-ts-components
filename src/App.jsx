import { createApp, defineComponent, h, reactive, ref } from 'vue'
const img = require('./assets/logo.png') // eslint-disable-line
import HelloWorld from './components/HelloWorld'
export default defineComponent({
  setup() {
    const state = reactive({
      name: 'wkj',
    })
    const numberRef = ref(1)
    // setInterval(() => {
    //   state.name += '1'
    //   numberRef.value += 1
    // }, 1000)
    return () => {
      const number = numberRef.value
      return (
        <div id="app">
          <img src={img} alt="Vue logo" />
          <p>{state.name + number}</p>
          <input type="text" v-model={state.name} />
          <HelloWorld msg={'asdasd'} age={123} />
        </div>
      )
    }
  },
})
