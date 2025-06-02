import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';

export default class DocsSettingsPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.setting = this.setting.bind(this);
    
    this.settings = {
      show_docs_link: this.setting('phpcmf-docs.show_docs_link', true),
      docs_title: this.setting('phpcmf-docs.docs_title', 'Documentation'),
      docs_description: this.setting('phpcmf-docs.docs_description', 'Welcome to our documentation')
    };
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
            bidi={this.settings.show_docs_link}
          />
        </div>
        
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.admin.settings.docs_title')}</label>
          <input
            className="FormControl"
            bidi={this.settings.docs_title}
          />
        </div>
        
        <div className="Form-group">
          <label>{app.translator.trans('phpcmf-docs.admin.settings.docs_description')}</label>
          <textarea
            className="FormControl"
            bidi={this.settings.docs_description}
            rows="3"
          />
        </div>
        
        {this.submitButton()}
      </div>
    );
  }
}