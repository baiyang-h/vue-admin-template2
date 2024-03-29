import { createApp } from 'vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './styles/index.scss';

import App from './App.vue';
import router from './router';
import store from './store';

import './permission'

createApp(App).use(store).use(router).use(Antd).mount('#app')
