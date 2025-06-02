import Component from 'flarum/common/Component';
import ListGrid from 'flarum/admin/components/ListGrid';
import DataTable from 'flarum/admin/components/DataTable';
import ActionButton from 'flarum/admin/components/ActionButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class DocsList extends Component {
    view() {
        if (!this.props.docs) {
            return <LoadingIndicator />;
        }

        return (
            <ListGrid>
                <DataTable>
                    <DataTable.Head>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.docs.title')}</DataTable.Header>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.docs.category')}</DataTable.Header>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.docs.status')}</DataTable.Header>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.docs.actions')}</DataTable.Header>
                    </DataTable.Head>
                    <DataTable.Body>
                        {this.props.docs.map(doc => (
                            <DataTable.Row key={doc.id()}>
                                <DataTable.Cell>{doc.title()}</DataTable.Cell>
                                <DataTable.Cell>
                                    {this.props.categories.find(cat => cat.id() === doc.categoryId())?.title() || 'Uncategorized'}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {doc.isPublished() ? 
                                        <span className="label label-success">{app.translator.trans('phpcmf-docs.admin.status.published')}</span> : 
                                        <span className="label label-default">{app.translator.trans('phpcmf-docs.admin.status.draft')}</span>
                                    }
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <ActionButton 
                                        href={app.route('docs.edit', {id: doc.id()})}
                                        icon="fas fa-edit"
                                    >
                                        {app.translator.trans('phpcmf-docs.admin.actions.edit')}
                                    </ActionButton>
                                    <ActionButton 
                                        onclick={() => this.deleteDoc(doc)}
                                        icon="fas fa-trash"
                                        className="Button--danger"
                                    >
                                        {app.translator.trans('phpcmf-docs.admin.actions.delete')}
                                    </ActionButton>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable.Body>
                </DataTable>
            </ListGrid>
        );
    }

    deleteDoc(doc) {
        if (confirm(app.translator.trans('phpcmf-docs.admin.confirm_delete_doc'))) {
            doc.delete().then(() => {
                this.props.onupdate();
            });
        }
    }
}
    