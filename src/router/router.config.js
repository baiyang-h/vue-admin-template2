import Layout from '@/layout'

/**
 * @description 说明
 * 直接定义在对象上，针对于应用路由
 * roles
 * name   确保和菜单模块的组件内 name 名字一致（说明：下面注意事项3）
 *
 *
 * meta  定义在meta属性上，针对于菜单模块，因为必须是菜单模块才需要下面的属性
 *  - title
 *  - icon
 *  - hidden  菜单模块隐藏/显示
 *  - noCache 不需要缓存，因为路由加了 keep-alive 所以会缓存。tagsView 中的缓存
 *  - affix: true  是否在 tagsView 中默认显示， 让首页默认显示
 *  - isSubmenu 是否是 Submenu 菜单，即有字菜单
 *
 *
 * @description 注意事项
 * 1. meta.isSubmenu: true 表示这是一个 Submenu，有子菜单，是一个可以展开的菜单
 * 2. 如果不是展开的菜单，根上，即有{ component: Layout } 这一层中不要写 meta.title， 对于菜单的描述，写到它的 children 中的 item.meta.title 中，
 *      因为在面包屑 Breadcrumb 中我们是根据 meta.title 来判断 matched 匹配的要显示的菜单层级
 * 3. name属性   一定要要和组件内部的name名一致， 因为 keep-alive 的 include就是根据组件的 name，
 *      而我们在 tagView 中会根据 route.name 来存储，所以他两要保持一致
 *
 */

/* Router Modules */
import tableRouter from './modules/table';
import formRouter from './modules/form'
import nestedRouter from './modules/nested';
import cacheRouter from './modules/cache'
import UtilRouter from './modules/util'

const constantRoutes = [
    {
        path: '/',
        name: 'App',
        component: Layout,
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    {
        path: '/redirect',
        name: '_Redirect',
        component: Layout,
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import('@/views/redirect'),
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
    },
]

const appRoutes = [
    {
        path: '/home',
        name: '_Home',
        redirect: '/home/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Home',
                meta: {
                    title: 'Home',
                    affix: true
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/permission',
        redirect: '/permission/page',
        name: 'Permission',
        component: Layout,
        roles: ['admin', 'other'],
        meta: {
            title: 'Permission',
            icon: 'el-icon-menu',
            isSubmenu: true
        },
        children: [
            {
                path: 'page',
                name: 'PagePermission',
                meta: {
                    title: 'Page Permission',
                },
                component: () => import('@/views/permission/page'),
            },
            {
                path: 'role',
                name: 'RolePermission',
                roles: ['admin'],
                meta: {
                    title: '角色管理',
                },
                component: () => import('@/views/permission/role'),
            }
        ]
    },
    tableRouter,
    formRouter,
    nestedRouter,
    cacheRouter,
    UtilRouter
]

export default {
    constantRoutes,
    appRoutes
}
