export default [
  {
    title: '全部',
    expand: true,
    children: [
      {
        title: '类目管理',
        expand: true,
        auth: '/page/ddd',
        children: [
          {
            title: '增加类目',
          },
          {
            title: '删除类目',
          },
        ],
      },
      {
        title: '用户管理',
        expand: true,
        children: [
          {
            title: '增加用户',
          },
          {
            title: '删除用户',
          },
        ],
      },
    ],
  },
]
