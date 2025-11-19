import { Link } from 'react-router-dom';
import { Policy } from '../utils/types';

interface Props {
  policy: Policy;
}

export const PolicyCard = ({ policy }: Props) => (
  <article className="policy-card">
    <div>
      <p className="category">{policy.category}</p>
      <h3>{policy.title}</h3>
      <p>Version {policy.version}</p>
    </div>
    <div>
      <Link to={`/policies/${policy.name}`}>View Details</Link>
    </div>
  </article>
);
