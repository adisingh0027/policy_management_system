import { useForm } from 'react-hook-form';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { RequestStatusTag } from '../components/RequestStatusTag';
import { useRequests, useReviewRequest } from '../hooks/useRequests';
import { useNotification } from '../context/NotificationProvider';

interface ReviewForm {
  status: 'Under Review' | 'Approved' | 'Rejected';
  remarks: string;
}

export const ReviewPage = () => {
  const { data, isLoading, error } = useRequests('Open');
  const reviewMutation = useReviewRequest();
  const { setMessage } = useNotification();
  const { register, handleSubmit, reset } = useForm<ReviewForm>({ defaultValues: { status: 'Under Review' } });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  const onSubmit = (requestId: string) => (values: ReviewForm) => {
    reviewMutation.mutate(
      { request_id: requestId, status: values.status, remarks: values.remarks },
      {
        onSuccess: () => {
          setMessage('Request updated');
          reset();
        }
      }
    );
  };

  return (
    <section>
      <header className="page-header">
        <h1>Review Requests</h1>
      </header>
      {data?.map(req => (
        <article key={req.name} className="review-card">
          <div>
            <h3>{req.policy}</h3>
            <p>{req.query}</p>
            <RequestStatusTag status={req.status} />
          </div>
          <form onSubmit={handleSubmit(onSubmit(req.name))} className="review-form">
            <label>
              Status
              <select {...register('status')}>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
            <label>
              Remarks
              <textarea {...register('remarks')} />
            </label>
            <button type="submit" disabled={reviewMutation.isPending}>
              Update
            </button>
          </form>
        </article>
      ))}
    </section>
  );
};
