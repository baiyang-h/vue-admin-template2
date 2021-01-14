import Layout from '@/layout'

export default {
    path: '/nested',
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
        title: '路由嵌套',
        icon: 'el-icon-menu',
        isSubmenu: true
    },
    component: Layout,
    children: [
        {
            path: 'menu1',
            redirect: '/nested/menu1/menu1-1',
            name: 'Menu1',
            meta: { title: '菜单 1', isSubmenu: true },
            component: () => import('@/views/nested/menu1/index'), // Parent router-view
            children: [
                {
                    path: 'menu1-1',
                    name: 'Menu1-1',
                    meta: { title: '菜单 1-1' },
                    component: () => import('@/views/nested/menu1/menu1-1'),
                },
                {
                    path: 'menu1-2',
                    name: 'Menu1-2',
                    redirect: '/nested/menu1/menu1-2/menu1-2-1',
                    meta: { title: '菜单 1-2', isSubmenu: true },
                    component: () => import('@/views/nested/menu1/menu1-2'),
                    children: [
                        {
                            path: 'menu1-2-1',
                            name: 'Menu1-2-1',
                            meta: { title: '菜单 1-2-1' },
                            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                        },
                        {
                            path: 'menu1-2-2',
                            name: 'Menu1-2-2',
                            meta: { title: '菜单 1-2-2' },
                            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                        }
                    ]
                },
                {
                    path: 'menu1-3',
                    name: 'Menu1-3',
                    meta: { title: '菜单 1-3' },
                    component: () => import('@/views/nested/menu1/menu1-3'),
                }
            ]
        },
        {
            path: 'menu2',
            name: 'Menu2',
            meta: { title: '菜单 2' },
            component: () => import('@/views/nested/menu2/index'),
        }
    ]
}