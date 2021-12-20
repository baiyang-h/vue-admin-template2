import Layout from '@/layout'

export default {
    path: '/form',
    name: '_Form',
    redirect: '/form/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Form',
            meta: {
                title: 'Form',
                icon: 'el-icon-menu',
            },
            component: () => import('@/views/form')
        }
    ]
}
