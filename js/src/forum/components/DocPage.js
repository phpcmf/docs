import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import DocumentMeta from 'flarum/common/utils/DocumentMeta';
import Markdown from 'flarum/common/utils/Markdown';
import Button from 'flarum/common/components/Button';

export default class DocPage extends Component {
    init() {
        this.doc = null;
        this.category = null;
        this.loading = true;

        this.load();
    }

    load() {
        this.loading = true;
        this.update();

        app.store.find('docs', this.props.doc, {include: 'category'})
            .then(doc => {
                this.doc = doc;
                this.category = doc.category();
                this.loading = false;
                this.update();
            })
            .catch(() => {
                m.route.set(app.route('docs'));
            });
    }

    view() {
        if (this.loading || !this.doc || !this.category) {
            return <div className="container">
                <LoadingIndicator />
            </div>;
        }

        return (
            <div className="container docs-doc-page">
                <div className="row">
                    <div className="col-md-3">
                        <div className="docs-sidebar">
                            <h3>{this.category.title()}</h3>
                            <ul className="nav nav-pills nav-stacked">
                                <li>
                                    <a href={app.route('docs.category', {category: this.category.slug()})}>&larr; {app.translator.trans('phpcmf-docs.forum.doc.back_to_category')}</a>
                                </li>
                                {this.category.docs().map(doc => (
                                    <li key={doc.id()} className={doc.id() === this.doc.id() ? 'active' : ''}>
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
                            <div className="docs-header">
                                <h1>{this.doc.title()}</h1>
                                <div className="docs-meta">
                                    <span className="docs-author">
                                        {app.translator.trans('phpcmf-docs.forum.doc.by_author', {
                                            author: this.doc.author().displayName()
                                        })}
                                    </span>
                                    <span className="docs-updated">
                                        {app.translator.trans('phpcmf-docs.forum.doc.last_updated', {
                                            date: moment(this.doc.updatedAt()).format('LL')
                                        })}
                                    </span>
                                    {this.doc.canEdit() ? (
                                        <Button 
                                            href={app.route('admin') + '/docs/edit/' + this.doc.id()} 
                                            icon="fas fa-edit" 
                                            className="btn btn-primary btn-sm pull-right"
                                        >
                                            {app.translator.trans('phpcmf-docs.forum.doc.edit')}
                                        </Button>
                                    ) : null}
                                </div>
                            </div>
                            
                            <div className="docs-body">
                                {app.forum.attribute('phpcmf-docs.enableMarkdown') ? (
                                    <div className="Markdown">{Markdown.parse(this.doc.content())}</div>
                                ) : (
                                    <div v-html={this.doc.content()} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    documentMeta() {
        if (!this.doc) return null;

        return <DocumentMeta title={this.doc.title()} description={this.doc.content().substring(0, 150)} />;
    }
}
    