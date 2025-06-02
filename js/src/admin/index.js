import Application from 'flarum/app';
import DocsPage from './components/DocsPage';
import EditDocModal from './components/EditDocModal';
import EditCategoryModal from './components/EditCategoryModal';

export default function() {
    Application.routes.docs = {path: '/docs', component: DocsPage.component()};
    Application.routes['docs.create'] = {path: '/docs/create', component: EditDocModal.component()};
    Application.routes['docs.edit'] = {path: '/docs/edit/:id', component: EditDocModal.component()};
    Application.routes['docs.createCategory'] = {path: '/docs/create-category', component: EditCategoryModal.component()};
    Application.routes['docs.editCategory'] = {path: '/docs/edit-category/:id', component: EditCategoryModal.component()};

    Application.initializers.add('phpcmf-docs', app => {
        app.extensionData
            .for('phpcmf-docs')
            .registerAdminPage(DocsPage);
    });
}
    