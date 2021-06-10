import { createApp, defineComponent, h } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// import App from './App.vue'
import App from './App.jsx'

// const App = defineComponent({
//   render() {
//     return h('div', { id: 'app' }, [
//       h('img', {
//         alt: 'Vue logo',
//         src: img,
//       }),
//       h(HelloWorld, {
//         msg: 'wkj test',
//       }),
//     ])
//   },
// })
createApp(App).mount('#app')
