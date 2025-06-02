import Application from 'flarum/app';
import DocsPage from './components/DocsPage';
import DocsCategoryPage from './components/DocsCategoryPage';
import DocPage from './components/DocPage';

export default function() {
    Application.routes.docs = {path: '/docs', component: DocsPage.component()};
    Application.routes['docs.category'] = {path: '/docs/{category}', component: DocsCategoryPage.component()};
    Application.routes['docs.doc'] = {path: '/docs/{category}/{doc}', component: DocPage.component()};

    Application.initializers.add('phpcmf-docs', app => {
        // 注册菜单链接
        app.extensionData
            .for('phpcmf-docs')
            .registerNavItem({
                icon: 'fas fa-book',
                path: '/docs',
                label: app.translator.trans('phpcmf-docs.forum.nav.docs'),
                active: 'docs'
            });
    });
}
    