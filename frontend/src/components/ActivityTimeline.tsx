import { ActivityLogEntry } from '../utils/types';

interface Props {
  items: ActivityLogEntry[];
}

export const ActivityTimeline = ({ items }: Props) => (
  <ul className="timeline">
    {items.map(item => (
      <li key={item.name}>
        <p className="event">{item.event_type}</p>
        <p>{item.details}</p>
        <small>
          {item.changed_by} • {new Date(item.modified).toLocaleString()}
        </small>
      </li>
    ))}
  </ul>
);
