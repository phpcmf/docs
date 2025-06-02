import app from 'flarum/forum/app';
import DocsPage from './src/forum/components/DocsPage';
import addDocsPage from './src/forum/routes';

app.initializers.add('phpcmf-docs', () => {
  app.routes.docs = { path: '/docs', component: DocsPage };
  
  addDocsPage();
});