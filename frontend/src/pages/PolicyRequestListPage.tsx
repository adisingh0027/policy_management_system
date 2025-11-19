import { RequestStatusTag } from '../components/RequestStatusTag';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { useRequests } from '../hooks/useRequests';

export const PolicyRequestListPage = () => {
  const { data, isLoading, error } = useRequests();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <section>
      <header className="page-header">
        <h1>My Requests</h1>
      </header>
      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Policy</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(req => (
            <tr key={req.name}>
              <td>{req.name}</td>
              <td>{req.policy}</td>
              <td>
                <RequestStatusTag status={req.status} />
              </td>
              <td>{new Date(req.modified).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
