import Layout from '@/layout'

export default {
    path: '/util',
    name: '_Util',
    redirect: '/util/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Util',
            meta: {
                title: '工具类',
                icon: 'el-icon-menu',
            },
            component: () => import('@/views/util')
        }
    ]
}
