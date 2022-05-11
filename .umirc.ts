// 路由配置文件
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 去除手动式路由,使用约定式路由
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // proxy 配置仅在 dev 时生效
  proxy: {
    // 例如: 访问 /api/users, 实则访问的是 http://localhost:1880/umidvaPro/users
    '/api': {
      target: 'http://localhost:1880/umidvaPro',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
