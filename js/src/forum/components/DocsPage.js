import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import DocList from './DocList';

export default class DocsPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.loading = true;
    this.docs = [];
    
    this.loadDocs();
  }
  
  loadDocs() {
    this.loading = true;
    m.redraw();
    
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/docs',
    }).then(result => {
      this.docs = result.data;
      this.loading = false;
      m.redraw();
    }).catch(() => {
      this.loading = false;
      m.redraw();
    });
  }
  
  view() {
    return (
      <div className="DocsPage">
        <div className="container">
          <div className="DocsPage-header">
            <h2>{app.translator.trans('phpcmf-docs.forum.page.title')}</h2>
            <p>{app.translator.trans('phpcmf-docs.forum.page.description')}</p>
            
            {app.session.user && app.session.user.can('docs.create') && (
              <Button 
                className="Button Button--primary" 
                onclick={() => app.modal.show(EditDocModal)}
              >
                {app.translator.trans('phpcmf-docs.forum.doc.create')}
              </Button>
            )}
          </div>
          
          {this.loading ? (
            <LoadingIndicator />
          ) : (
            <DocList docs={this.docs} />
          )}
        </div>
      </div>
    );
  }
}