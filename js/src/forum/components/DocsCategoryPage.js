import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import DocumentMeta from 'flarum/common/utils/DocumentMeta';
import Button from 'flarum/common/components/Button';

export default class DocsCategoryPage extends Component {
    init() {
        this.category = null;
        this.loading = true;

        this.load();
    }

    load() {
        this.loading = true;
        this.update();

        app.store.find('docs-categories', this.props.slug, {include: 'docs'})
            .then(category => {
                this.category = category;
                this.loading = false;
                this.update();
            })
            .catch(() => {
                m.route.set(app.route('docs'));
            });
    }

    view() {
        if (this.loading || !this.category) {
            return <div className="container">
                <LoadingIndicator />
            </div>;
        }

        return (
            <div className="container docs-category-page">
                <div className="row">
                    <div className="col-md-3">
                        <div className="docs-sidebar">
                            <h3>{app.translator.trans('phpcmf-docs.forum.category.sidebar_title')}</h3>
                            <ul className="nav nav-pills nav-stacked">
                                <li>
                                    <a href={app.route('docs')}>&larr; {app.translator.trans('phpcmf-docs.forum.category.back_to_docs')}</a>
                                </li>
                                {this.category.docs().map(doc => (
                                    <li key={doc.id()} className={m.route.get() === app.route('docs.doc', {category: this.category.slug(), doc: doc.slug()}) ? 'active' : ''}>
                                        <a href={app.route('docs.doc', {category: this.category.slug(), doc: doc.slug()})}>
                                            {doc.title()}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="docs-content">
                            <h1>{this.category.title()}</h1>
                            <div className="docs-category-description" v-html={this.category.description()} />
                            
                            {this.category.docs().length ? (
                                <div className="docs-list">
                                    <h2>{app.translator.trans('phpcmf-docs.forum.category.docs_list')}</h2>
                                    <ul>
                                        {this.category.docs().map(doc => (
                                            <li key={doc.id()}>
                                                <a href={app.route('docs.doc', {category: this.category.slug(), doc: doc.slug()})}>
                                                    {doc.title()}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="alert alert-info">
                                    {app.translator.trans('phpcmf-docs.forum.category.no_docs')}
                                    {this.category.canCreateDoc() ? (
                                        <Button 
                                            href={app.route('admin') + '/docs/create?category=' + this.category.id()} 
                                            icon="fas fa-plus" 
                                            className="btn btn-primary btn-sm"
                                        >
                                            {app.translator.trans('phpcmf-docs.forum.category.create_doc')}
                                        </Button>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    documentMeta() {
        if (!this.category) return null;

        return <DocumentMeta title={this.category.title()} />;
    }
}
    