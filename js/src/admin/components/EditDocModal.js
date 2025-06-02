import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import TextEditor from 'flarum/common/components/TextEditor';
import Select from 'flarum/common/components/Select';

export default class EditDocModal extends Modal {
    className() {
        return 'EditDocModal Modal--large';
    }

    title() {
        return this.props.doc 
            ? app.translator.trans('phpcmf-docs.admin.edit_doc.title', {title: this.props.doc.title()}) 
            : app.translator.trans('phpcmf-docs.admin.create_doc.title');
    }

    content() {
        if (this.loading) {
            return <div className="Modal-body">
                <LoadingIndicator />
            </div>;
        }

        return (
            <div className="Modal-body">
                <div className="Form">
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_doc.title_label')}</label>
                        <input 
                            type="text" 
                            className="FormControl" 
                            value={this.doc.title()} 
                            oninput={m.withAttr('value', value => this.doc.title = value)}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_doc.slug_label')}</label>
                        <input 
                            type="text" 
                            className="FormControl" 
                            value={this.doc.slug()} 
                            oninput={m.withAttr('value', value => this.doc.slug = value)}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_doc.category_label')}</label>
                        <Select 
                            options={this.categoriesList()} 
                            value={this.doc.categoryId()} 
                            onchange={value => this.doc.category_id = value}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_doc.content_label')}</label>
                        <TextEditor 
                            value={this.doc.content()} 
                            oninput={value => this.doc.content = value}
                            placeholder={app.translator.trans('phpcmf-docs.admin.edit_doc.content_placeholder')}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={this.doc.isPublished()} 
                                onchange={m.withAttr('checked', checked => this.doc.is_published = checked)}
                            />
                            {app.translator.trans('phpcmf-docs.admin.edit_doc.published_label')}
                        </label>
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_doc.order_label')}</label>
                        <input 
                            type="number" 
                            className="FormControl" 
                            value={this.doc.order()} 
                            oninput={m.withAttr('value', value => this.doc.order = value)}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <Button 
                            type="submit" 
                            className="Button Button--primary" 
                            loading={this.loading}
                        >
                            {app.translator.trans('phpcmf-docs.admin.save_changes')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    oninit(vnode) {
        super.oninit(vnode);
        
        this.loading = true;
        this.doc = null;
        this.categories = [];
        
        this.load();
    }

    load() {
        Promise.all([
            app.store.find('docs-categories'),
            this.props.id ? app.store.find('docs', this.props.id) : app.store.create('docs')
        ]).then(([categories, doc]) => {
            this.categories = categories;
            this.doc = doc;
            
            if (!this.props.id) {
                const categoryId = m.route.param('category');
                if (categoryId) {
                    this.doc.category_id = categoryId;
                }
            }
            
            this.loading = false;
            this.update();
        });
    }

    categoriesList() {
        return this.categories.reduce((list, category) => {
            list[category.id()] = category.title();
            return list;
        }, {});
    }

    onsubmit(e) {
        e.preventDefault();
        
        this.loading = true;
        this.update();
        
        this.doc.save().then(() => {
            this.hide();
            m.route.set(app.route('docs'));
            app.alerts.show(
                'docSaved',
                app.translator.trans('phpcmf-docs.admin.doc_saved'),
                3000,
                'success'
            );
        }).catch(err => {
            this.loading = false;
            this.update();
            app.alerts.show('docError', err.message, 5000, 'error');
        });
    }
}
    