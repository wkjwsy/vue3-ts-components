import { createApp, defineComponent, h } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png') // eslint-disable-line
const App = defineComponent({
  render() {
    return h('div', { id: 'app' }, [
      h('img', {
        alt: 'Vue logo',
        src: img,
      }),
      h(HelloWorld, {
        msg: 'wkj test',
      }),
    ])
  },
})
createApp(App).mount('#app')
