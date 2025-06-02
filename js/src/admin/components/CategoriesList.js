import Component from 'flarum/common/Component';
import ListGrid from 'flarum/admin/components/ListGrid';
import DataTable from 'flarum/admin/components/DataTable';
import ActionButton from 'flarum/admin/components/ActionButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class CategoriesList extends Component {
    view() {
        if (!this.props.categories) {
            return <LoadingIndicator />;
        }

        return (
            <ListGrid>
                <DataTable>
                    <DataTable.Head>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.categories.title')}</DataTable.Header>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.categories.description')}</DataTable.Header>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.categories.status')}</DataTable.Header>
                        <DataTable.Header>{app.translator.trans('phpcmf-docs.admin.categories.actions')}</DataTable.Header>
                    </DataTable.Head>
                    <DataTable.Body>
                        {this.props.categories.map(category => (
                            <DataTable.Row key={category.id()}>
                                <DataTable.Cell>{category.title()}</DataTable.Cell>
                                <DataTable.Cell>{category.description()}</DataTable.Cell>
                                <DataTable.Cell>
                                    {category.isPublished() ? 
                                        <span className="label label-success">{app.translator.trans('phpcmf-docs.admin.status.published')}</span> : 
                                        <span className="label label-default">{app.translator.trans('phpcmf-docs.admin.status.draft')}</span>
                                    }
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <ActionButton 
                                        href={app.route('docs.editCategory', {id: category.id()})}
                                        icon="fas fa-edit"
                                    >
                                        {app.translator.trans('phpcmf-docs.admin.actions.edit')}
                                    </ActionButton>
                                    <ActionButton 
                                        onclick={() => this.deleteCategory(category)}
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

    deleteCategory(category) {
        if (confirm(app.translator.trans('phpcmf-docs.admin.confirm_delete_category'))) {
            category.delete().then(() => {
                this.props.onupdate();
            });
        }
    }
}
    