import { useQuery } from '@tanstack/react-query';
import { fetchPolicies, fetchPolicyDetail } from '../api/policies';

export const usePolicies = () => useQuery({ queryKey: ['policies'], queryFn: fetchPolicies });

export const usePolicyDetail = (policyId: string) =>
  useQuery({
    queryKey: ['policy', policyId],
    queryFn: () => fetchPolicyDetail(policyId),
    enabled: Boolean(policyId)
  });
