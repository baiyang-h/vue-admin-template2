import Layout from '@/layout'

export default {
    path: '/cache',
    redirect: '/cache/index',
    component: Layout,
    children: [
        {
            path: 'index',
            name: 'Cache',
            cache: true,
            meta: {
                title: '缓存模块测试',
                icon: 'el-icon-menu',
            },
            component: () => import('@/views/cache')
        }
    ]
}