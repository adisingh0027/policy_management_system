import { api } from './client';
import { PolicyRequest } from '../utils/types';

export const fetchRequests = async (status?: string) => {
  const { data } = await api.get<PolicyRequest[]>('/get_policy_request_list', { params: { status } });
  return data;
};

export const createRequest = async (payload: { policy: string; query: string }) => {
  const { data } = await api.post<PolicyRequest>('/create_policy_request', payload);
  return data;
};

export const reviewRequest = async (payload: { request_id: string; status: string; remarks?: string }) => {
  const { data } = await api.post<PolicyRequest>('/review_request', payload);
  return data;
};
