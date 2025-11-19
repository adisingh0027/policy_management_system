import { PolicyCard } from '../components/PolicyCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { usePolicies } from '../hooks/usePolicies';
import { useCreateRequest } from '../hooks/useRequests';

export const PoliciesListPage = () => {
  const { data, isLoading, error } = usePolicies();
  const requestMutation = useCreateRequest();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>Policies</h1>
          <p>Active policies grouped by category</p>
        </div>
      </header>
      <div className="policy-grid">
        {data?.map(policy => (
          <div key={policy.name}>
            <PolicyCard policy={policy} />
            <button
              type="button"
              onClick={() => requestMutation.mutate({ policy: policy.name, query: 'Clarification requested' })}
            >
              Request Clarification
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
