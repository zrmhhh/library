let homePages = [
    {
        title: 'aaa',
        alias_title: 'aaa',
        desc: 'aaa',
        frontend_url: '/permission/role-list',
    }
]
let subPages = [
    {
        title: '角色列表',
        alias_title: '角色列表',
        desc: '角色列表',
        frontend_url: '/permission/role-list',
        header: 'home',
        parent_id: 2
    }, {
        title: '人员列表',
        alias_title: '人员列表',
        desc: '人员列表',
        frontend_url: '/permission/staff-list',
        header: 'home',
        parent_id: 2
    }, {
        title: '菜单列表',
        alias_title: '菜单列表',
        desc: '菜单列表',
        frontend_url: '/permission/menu-list',
        header: 'home',
        parent_id: 2
    }
]

let opsMenu = [
    
]

module.exports = {
    homePages,
    subPages
}