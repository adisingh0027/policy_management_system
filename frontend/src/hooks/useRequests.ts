import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRequest, fetchRequests, reviewRequest } from '../api/requests';

export const useRequests = (status?: string) =>
  useQuery({ queryKey: ['requests', status], queryFn: () => fetchRequests(status) });

export const useCreateRequest = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createRequest,
    onSuccess: () => client.invalidateQueries({ queryKey: ['requests'] })
  });
};

export const useReviewRequest = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: reviewRequest,
    onSuccess: () => client.invalidateQueries({ queryKey: ['requests'] })
  });
};
