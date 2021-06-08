module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest', // 通过vue-jest去编译.vue文件为js，让测试用例可以跑起来
  },
}
