export default {
    // 角色
    roles: state => state.user.roles,
    // 用户信息
    admin: state => state.user.admin,
    // 有权限的所有路由
    routes: state => state.permission.routes,
    // 有权限的应用路由
    appRoutes: state => state.permission.appRoutes,
    // 拉平的有权限的应用路由
    flatAppRoutes: state => state.permission.flatAppRoutes,
    // 菜单
    menu: state => state.app.menu,
    // tagView 显示的 tags
    visitedViews: state => state.tagView.visitedViews,
    // 显示的 tagView 中缓存的 tagView
    cachedViews: state => state.tagView.cachedViews
}
