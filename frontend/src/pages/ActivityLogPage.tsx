import { ActivityTimeline } from '../components/ActivityTimeline';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { useActivityLog } from '../hooks/useActivityLog';

export const ActivityLogPage = () => {
  const { data, isLoading, error } = useActivityLog();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <section>
      <header className="page-header">
        <h1>Activity Log</h1>
      </header>
      <ActivityTimeline items={data ?? []} />
    </section>
  );
};
