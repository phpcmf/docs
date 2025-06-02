import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import IndexPage from 'flarum/forum/components/IndexPage';

export default function addDocsPage() {
  app.routes.docs = { path: '/docs', component: DocsPage };
  app.routes['docs.show'] = { path: '/docs/:id', component: DocPage };

  extend(HeaderSecondary.prototype, 'items', function(items) {
    if (app.forum.attribute('phpcmf-docs.show_docs_link')) {
      items.add(
        'docs',
        <a href={app.route('docs')} config={m.route}>
          {app.translator.trans('phpcmf-docs.forum.header.docs_link')}
        </a>,
        10
      );
    }
  });

  extend(IndexPage.prototype, 'navItems', function(items) {
    if (app.forum.attribute('phpcmf-docs.show_docs_link')) {
      items.add(
        'docs',
        <a href={app.route('docs')} config={m.route}>
          {app.translator.trans('phpcmf-docs.forum.header.docs_link')}
        </a>,
        10
      );
    }
  });
}