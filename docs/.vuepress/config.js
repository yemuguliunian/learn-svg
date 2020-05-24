/**
 * 此文件是由脚本 scripts/generator.ts 自动生成
 */
module.exports = {
    title: 'learn-svg',
    description: 'svg 学习笔记',
    base: '/learn-svg/',
    port: '3000',
    dest: './dist',
    themeConfig: {
        repo: 'yemuguliunian/learn-svg',
        sidebarDepth: 2,
        nav: [
            {
                text: '属性',
                link: '/attribute/',
            },
            {
                text: '元素',
                link: '/element/',
            },
            {
                text: '示例',
                link: '/examples/简单实现一个圆形进度条',
            },
        ],
        sidebar: {
            '/attribute': [
                {
                    title: '属性',
                    collapsable: false,
                    sidebarDepth: 0,
                    path: '/attribute',
                    children: [
                        '/attribute/stroke',
                        '/attribute/stroke-dasharray',
                        '/attribute/stroke-dashoffset',
                    ],
                },
            ],
            '/element': [
                {
                    title: '元素',
                    collapsable: false,
                    sidebarDepth: 0,
                    path: '/element/',
                },
            ],
            '/examples': [
                {
                    title: '示例',
                    collapsable: false,
                    sidebarDepth: 0,
                    children: ['/examples/简单实现一个圆形进度条', '/examples/clock'],
                },
            ],
        },
        smoothScroll: true,
    },
    plugins: ['@vuepress/back-to-top'],
};
