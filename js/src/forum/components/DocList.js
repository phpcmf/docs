import Component from 'flarum/common/Component';
import Link from 'flarum/common/components/Link';
import humanTime from 'flarum/common/helpers/humanTime';

export default class DocList extends Component {
  view() {
    const { docs } = this.attrs;

    return (
      <div className="DocList">
        {docs.map(doc => (
          <div className="DocList-item" key={doc.id}>
            <h3>
              <Link href={app.route('docs.show', { id: doc.id })}>
                {doc.attributes.title}
              </Link>
            </h3>
            <div className="DocList-excerpt">
              {doc.attributes.content.substring(0, 150)}...
            </div>
            <div className="DocList-meta">
              {humanTime(doc.attributes.createdAt)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}