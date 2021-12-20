import Layout from '@/layout'

export default {
    path: '/table',
    name: '_Table',
    redirect: '/table/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Table',
            meta: {
                title: 'Table',
                icon: 'el-icon-menu',
            },
            component: () => import('@/views/table')
        },
    ]
}
