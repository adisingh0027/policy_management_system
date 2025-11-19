interface Props {
  status: string;
}

const STATUS_CLASS: Record<string, string> = {
  Open: 'status-open',
  'Under Review': 'status-review',
  Approved: 'status-approved',
  Rejected: 'status-rejected'
};

export const RequestStatusTag = ({ status }: Props) => (
  <span className={`status-tag ${STATUS_CLASS[status] ?? ''}`}>{status}</span>
);
