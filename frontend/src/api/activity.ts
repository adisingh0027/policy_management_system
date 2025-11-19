import { api } from './client';
import { ActivityLogEntry } from '../utils/types';

export const fetchActivityLog = async (referenceName?: string) => {
  const { data } = await api.get<ActivityLogEntry[]>('/get_activity_logs', {
    params: { reference_name: referenceName }
  });
  return data;
};
