import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ItemList from 'flarum/common/utils/ItemList';
import AdminNav from 'flarum/admin/components/AdminNav';
import AdminLinkButton from 'flarum/admin/components/AdminLinkButton';
import DocsList from './DocsList';
import CategoriesList from './CategoriesList';

export default class DocsPage extends Component {
    init() {
        this.loading = true;
        this.categories = [];
        this.docs = [];
        this.activeTab = 'categories';

        this.load();
    }

    load() {
        this.loading = true;
        this.update();

        Promise.all([
            app.store.find('docs-categories'),
            app.store.find('docs')
        ]).then(([categories, docs]) => {
            this.categories = categories;
            this.docs = docs;
            this.loading = false;
            this.update();
        });
    }

    view() {
        return (
            <div className="container">
                <div className="row">
                    <AdminNav />
                    <div className="col-md-9">
                        <div className="docs-admin-header">
                            <h1>{app.translator.trans('phpcmf-docs.admin.title')}</h1>
                            
                            <div className="docs-admin-tabs">
                                <Button 
                                    className={this.activeTab === 'categories' ? 'active' : ''}
                                    onclick={() => this.activeTab = 'categories'}
                                >
                                    {app.translator.trans('phpcmf-docs.admin.tabs.categories')}
                                </Button>
                                <Button 
                                    className={this.activeTab === 'docs' ? 'active' : ''}
                                    onclick={() => this.activeTab = 'docs'}
                                >
                                    {app.translator.trans('phpcmf-docs.admin.tabs.docs')}
                                </Button>
                            </div>
                            
                            {this.activeTab === 'categories' ? (
                                <Button 
                                    href={app.route('docs.createCategory')} 
                                    icon="fas fa-plus" 
                                    className="btn btn-primary"
                                >
                                    {app.translator.trans('phpcmf-docs.admin.create_category')}
                                </Button>
                            ) : (
                                <Button 
                                    href={app.route('docs.create')} 
                                    icon="fas fa-plus" 
                                    className="btn btn-primary"
                                >
                                    {app.translator.trans('phpcmf-docs.admin.create_doc')}
                                </Button>
                            )}
                        </div>
                        
                        {this.loading ? (
                            <LoadingIndicator />
                        ) : this.activeTab === 'categories' ? (
                            <CategoriesList categories={this.categories} onupdate={this.load.bind(this)} />
                        ) : (
                            <DocsList docs={this.docs} categories={this.categories} onupdate={this.load.bind(this)} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
    