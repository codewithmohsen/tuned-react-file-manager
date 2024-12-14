import { api } from './api';

export const deleteAPI = async (ids) => {
  console.log(api, ids);
  const response = await api.delete('', { data: { ids: ids } });
  return response;
};
