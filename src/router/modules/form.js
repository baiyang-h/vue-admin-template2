import Layout from '@/layout'

export default {
    path: '/form',
    redirect: '/form/index',
    meta: {
        title: 'Form',
        icon: 'el-icon-menu',
    },
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Form',
            component: () => import('@/views/form')
        }
    ]
}