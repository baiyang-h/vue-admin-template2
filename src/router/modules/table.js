import Layout from '@/layout'

export default {
    path: '/table',
    redirect: '/table/index',
    meta: {
        title: 'Table',
        icon: 'el-icon-menu',
    },
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Table',
            component: () => import('@/views/table')
        },
    ]
}