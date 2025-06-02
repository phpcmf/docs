import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class EditCategoryModal extends Modal {
    className() {
        return 'EditCategoryModal Modal--medium';
    }

    title() {
        return this.props.category 
            ? app.translator.trans('phpcmf-docs.admin.edit_category.title', {title: this.props.category.title()}) 
            : app.translator.trans('phpcmf-docs.admin.create_category.title');
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
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_category.title_label')}</label>
                        <input 
                            type="text" 
                            className="FormControl" 
                            value={this.category.title()} 
                            oninput={m.withAttr('value', value => this.category.title = value)}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_category.slug_label')}</label>
                        <input 
                            type="text" 
                            className="FormControl" 
                            value={this.category.slug()} 
                            oninput={m.withAttr('value', value => this.category.slug = value)}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_category.description_label')}</label>
                        <textarea 
                            className="FormControl" 
                            value={this.category.description()} 
                            oninput={m.withAttr('value', value => this.category.description = value)}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={this.category.isPublished()} 
                                onchange={m.withAttr('checked', checked => this.category.is_published = checked)}
                            />
                            {app.translator.trans('phpcmf-docs.admin.edit_category.published_label')}
                        </label>
                    </div>
                    
                    <div className="Form-group">
                        <label>{app.translator.trans('phpcmf-docs.admin.edit_category.order_label')}</label>
                        <input 
                            type="number" 
                            className="FormControl" 
                            value={this.category.order()} 
                            oninput={m.withAttr('value', value => this.category.order = value)}
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
        this.category = null;
        
        this.load();
    }

    load() {
        const promise = this.props.id 
            ? app.store.find('docs-categories', this.props.id) 
            : app.store.create('docs-categories');
        
        promise.then(category => {
            this.category = category;
            this.loading = false;
            this.update();
        });
    }

    onsubmit(e) {
        e.preventDefault();
        
        this.loading = true;
        this.update();
        
        this.category.save().then(() => {
            this.hide();
            m.route.set(app.route('docs'));
            app.alerts.show(
                'categorySaved',
                app.translator.trans('phpcmf-docs.admin.category_saved'),
                3000,
                'success'
            );
        }).catch(err => {
            this.loading = false;
            this.update();
            app.alerts.show('categoryError', err.message, 5000, 'error');
        });
    }
}
    