import { useParams } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { usePolicyDetail } from '../hooks/usePolicies';
import { useCreateRequest } from '../hooks/useRequests';

export const PolicyDetailPage = () => {
  const { policyId = '' } = useParams();
  const { data, isLoading, error } = usePolicyDetail(policyId);
  const requestMutation = useCreateRequest();

  if (isLoading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error?.message ?? 'Policy not found'} />;

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="category">{data.category}</p>
          <h1>{data.title}</h1>
          <p>Active from {new Date(data.active_from).toLocaleDateString()}</p>
        </div>
        <div>
          {data.attachment && (
            <a href={data.attachment} target="_blank" rel="noreferrer">
              Download Attachment
            </a>
          )}
        </div>
      </header>
      <article dangerouslySetInnerHTML={{ __html: data.description }} />
      <button type="button" onClick={() => requestMutation.mutate({ policy: data.name, query: 'Clarification requested' })}>
        Request Clarification
      </button>
    </section>
  );
};
