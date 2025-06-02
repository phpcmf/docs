import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import EditDocModal from './EditDocModal';

export default class DocPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.loading = true;
    this.doc = null;
    
    this.loadDoc();
  }
  
  loadDoc() {
    const id = m.route.param('id');
    
    this.loading = true;
    m.redraw();
    
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/docs/' + id,
    }).then(result => {
      this.doc = result.data;
      this.loading = false;
      m.redraw();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
  
  view() {
    if (this.loading) {
      return <LoadingIndicator />;
    }
    
    if (!this.doc) {
      return (
        <div className="DocPage">
          <div className="container">
            <p>{app.translator.trans('phpcmf-docs.forum.doc.not_found')}</p>
          </div>
        </div>
      );
    }
    
    const canEdit = app.session.user && (
      app.session.user.can('docs.edit') || 
      (app.session.user.can('docs.editOwn') && this.doc.relationships.user.data.id === app.session.user.id)
    );
    
    return (
      <div className="DocPage">
        <div className="container">
          <div className="DocPage-header">
            <h2>{this.doc.attributes.title}</h2>
            
            {canEdit && (
              <div className="DocPage-actions">
                <Button 
                  className="Button Button--primary" 
                  onclick={() => app.modal.show(EditDocModal, { doc: this.doc })}
                >
                  {app.translator.trans('phpcmf-docs.forum.doc.edit')}
                </Button>
                
                <Button 
                  className="Button Button--danger" 
                  onclick={this.delete.bind(this)}
                >
                  {app.translator.trans('phpcmf-docs.forum.doc.delete')}
                </Button>
              </div>
            )}
          </div>
          
          <div className="DocPage-content">
            {m.trust(this.doc.attributes.content)}
          </div>
          
          <div className="DocPage-meta">
            {app.translator.trans('phpcmf-docs.forum.doc.created_at', {
              date: humanTime(this.doc.attributes.createdAt)
            })}
          </div>
        </div>
      </div>
    );
  }
  
  delete() {
    if (!confirm(app.translator.trans('phpcmf-docs.forum.doc.delete_confirmation'))) {
      return;
    }
    
    app.request({
      method: 'DELETE',
      url: `${app.forum.attribute('apiUrl')}/docs/${this.doc.id}`,
    }).then(() => {
      app.alerts.show(
        { type: 'success' },
        app.translator.trans('phpcmf-docs.forum.doc.deleted')
      );
      m.route.set('/docs');
    });
  }
}