import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app' , 将路径转为一个该文件的文件名
  const moduleName = modulePath.replace(/\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default createStore({
  modules,
  getters
})


/*
 如果要调用的话
 store.dispatch('a/actions_a')
 store.commit('a/actions_a')
*/