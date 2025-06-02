import Component from 'flarum/common/Component';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ItemList from 'flarum/common/utils/ItemList';
import DocumentMeta from 'flarum/common/utils/DocumentMeta';

export default class DocsPage extends Component {
    init() {
        this.categories = [];
        this.loading = true;

        this.load();
    }

    load() {
        this.loading = true;
        this.update();

        app.store.find('docs-categories', {filter: {isPublished: true}})
            .then(categories => {
                this.categories = categories;
                this.loading = false;
                this.update();
            });
    }

    view() {
        if (this.loading) {
            return <div className="container">
                <LoadingIndicator />
            </div>;
        }

        return (
            <div className="container docs-page">
                <h1>{app.translator.trans('phpcmf-docs.forum.docs.title')}</h1>
                
                {this.categories.length ? (
                    <div className="docs-categories">
                        {this.categories.map(category => (
                            <div className="docs-category" key={category.id()}>
                                <div className="docs-category-header">
                                    <h2>
                                        <a href={app.route('docs.category', {category: category.slug()})}>
                                            {category.title()}
                                        </a>
                                    </h2>
                                    <p className="docs-category-description">{category.description()}</p>
                                </div>
                                
                                {category.docs().length ? (
                                    <ul className="docs-list">
                                        {category.docs().map(doc => (
                                            <li key={doc.id()}>
                                                <a href={app.route('docs.doc', {category: category.slug(), doc: doc.slug()})}>
                                                    {doc.title()}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted">{app.translator.trans('phpcmf-docs.forum.docs.no_docs')}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p>{app.translator.trans('phpcmf-docs.forum.docs.no_categories')}</p>
                        {app.currentUser.can('createDocsCategories') ? (
                            <Button href={app.route('admin')} icon="fas fa-plus">
                                {app.translator.trans('phpcmf-docs.forum.docs.create_category')}
                            </Button>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }

    documentMeta() {
        return <DocumentMeta title={app.translator.trans('phpcmf-docs.forum.docs.title')} />;
    }
}
    