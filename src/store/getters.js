export default {
    roles: state => state.user.roles,
    admin: state => state.user.admin,
    routes: state => state.permission.routes,
    appRoutes: state => state.permission.appRoutes,
    flatAppRoutes: state => state.permission.flatAppRoutes,
    menu: state => state.app.menu
}
