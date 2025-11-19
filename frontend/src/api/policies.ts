import { api } from './client';
import { Policy } from '../utils/types';

export const fetchPolicies = async () => {
  const { data } = await api.get<Policy[]>('/get_active_policies');
  return data;
};

export const fetchPolicyDetail = async (policyId: string) => {
  const policies = await fetchPolicies();
  return policies.find(policy => policy.name === policyId);
};
