import router from './router';
import store from './store';

import { getToken } from '@/libs/token';

router.beforeEach(async (to, from, next) => {
    const token = getToken();
    if(token){
        if(to.path === '/login') {   // 如果在有 token 的情况下，直接回退上一页 login 则默认到 /
            next('/')
        } else {
            // 是否有登录角色信息
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if(hasRoles) {
                next()
            } else {
                try {
                    // 获取用户信息
                    const roles = await store.dispatch('user/getInfo', token)
                    // 通过用户信息，用户权限，生成新的有权限的路由
                    await store.dispatch('permission/generateRoutes', roles);
                    next({...to, replace: true})
                } catch (e) {
                    console.log(e)
                }
            }
        }
    } else {
        // 如果直接写跳转到next('/login')，会发现死循环, /login 一直重定向到 /login。
        // /login?redirect=${to.path} 他的 to.path === '/login'， 所以/login时要用 next, 避免死循环
        if(to.path === '/login') {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
})
