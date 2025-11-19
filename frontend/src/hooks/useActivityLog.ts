import { useQuery } from '@tanstack/react-query';
import { fetchActivityLog } from '../api/activity';

export const useActivityLog = (referenceName?: string) =>
  useQuery({
    queryKey: ['activity', referenceName],
    queryFn: () => fetchActivityLog(referenceName),
    staleTime: 60_000
  });
