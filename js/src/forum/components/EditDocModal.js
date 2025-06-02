import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class EditDocModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.doc = this.attrs.doc || null;
    
    this.title = Stream(this.doc ? this.doc.attributes.title : '');
    this.content = Stream(this.doc ? this.doc.attributes.content : '');
    this.isPublished = Stream(this.doc ? this.doc.attributes.isPublished : false);
    
    this.loading = false;
  }
  
  className() {
    return 'EditDocModal';
  }
  
  title() {
    return this.doc 
      ? app.translator.trans('phpcmf-docs.forum.doc.edit')
      : app.translator.trans('phpcmf-docs.forum.doc.create');
  }
  
  content() {
    return (
      <div className="Modal-body">
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.forum.doc.title')}</label>
          <input 
            className="FormControl" 
            bidi={this.title}
            disabled={this.loading}
          />
        </div>
        
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.forum.doc.content')}</label>
          <textarea
            className="FormControl"
            bidi={this.content}
            rows="10"
            disabled={this.loading}
          />
        </div>
        
        {app.session.user.can('docs.publish') && (
          <div className="Form-group">
            <label>
              <input
                type="checkbox"
                bidi={this.isPublished}
                disabled={this.loading}
              />
              {' '}
              {app.translator.trans('phpcmf-docs.forum.doc.publish')}
            </label>
          </div>
        )}
        
        <div className="Form-group">
          <Button
            type="submit"
            className="Button Button--primary"
            loading={this.loading}
          >
            {app.translator.trans('phpcmf-docs.forum.doc.save')}
          </Button>
          <Button
            className="Button"
            onclick={this.hide.bind(this)}
            disabled={this.loading}
          >
            {app.translator.trans('phpcmf-docs.forum.doc.cancel')}
          </Button>
        </div>
      </div>
    );
  }
  
  onsubmit(e) {
    e.preventDefault();
    
    this.loading = true;
    
    const data = {
      title: this.title(),
      content: this.content(),
      isPublished: this.isPublished()
    };
    
    const request = this.doc
      ? app.request({
          method: 'PATCH',
          url: `${app.forum.attribute('apiUrl')}/docs/${this.doc.id}`,
          body: { data: { attributes: data } }
        })
      : app.request({
          method: 'POST',
          url: `${app.forum.attribute('apiUrl')}/docs`,
          body: { data: { attributes: data } }
        });
    
    request.then(result => {
      if (this.doc) {
        app.alerts.show(
          { type: 'success' },
          app.translator.trans('phpcmf-docs.forum.doc.updated')
        );
      } else {
        app.alerts.show(
          { type: 'success' },
          app.translator.trans('phpcmf-docs.forum.doc.created')
        );
      }
      
      this.hide();
      m.redraw();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
}