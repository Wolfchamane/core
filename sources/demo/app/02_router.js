Demo.Router = Core.Router.extend({});
Demo.Router.init({
    base: '/core',
    rootNode: 'web-content',
    paths: [
        {
            path: '/',
            template: Demo.TEMPLATES['index']
        },
        {
            path: 'global-position',
            template: Demo.TEMPLATES['home']
        },
        {
            path: 'about',
            template: Demo.TEMPLATES['about']
        }
    ]
});