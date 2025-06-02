import SettingsPage from 'flarum/components/SettingsPage';

export default class DocsSettingsPage extends SettingsPage {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.setting('phpcmf-docs.show_docs_link', true);
    this.setting('phpcmf-docs.docs_title', 'Documentation');
    this.setting('phpcmf-docs.docs_description', 'Welcome to our documentation');
  }

  content() {
    return (
      <div className="DocsSettingsPage">
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.admin.settings.show_docs_link')}</label>
          <div className="helpText">
            {app.translator.trans('phpcmf-docs.admin.settings.show_docs_link_help')}
          </div>
          <input
            className="FormControl"
            type="checkbox"
            bidi={this.setting('phpcmf-docs.show_docs_link')}
          />
        </div>
        
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.admin.settings.docs_title')}</label>
          <input
            className="FormControl"
            bidi={this.setting('phpcmf-docs.docs_title')}
          />
        </div>
        
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.admin.settings.docs_description')}</label>
          <textarea
            className="FormControl"
            bidi={this.setting('phpcmf-docs.docs_description')}
            rows="3"
          />
        </div>
        
        <div className="Form-group">
          <button
            type="submit"
            className="Button Button--primary"
          >
            {app.translator.trans('phpcmf-docs.admin.settings.submit_button')}
          </button>
        </div>
      </div>
    );
  }
}