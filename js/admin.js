import app from 'flarum/admin/app';
import DocsSettingsPage from './src/admin/DocsSettingsPage';

app.initializers.add('phpcmf-docs', () => {
  app.extensionData
    .for('phpcmf-docs')
    .registerPage(DocsSettingsPage);
});