import { api } from './api';

export const createFolderAPI = async (name, parentId) => {
  try {
    console.log(api, name, parentId);
    const response = await api.post('/folder', { name, parentId });
    return response;
  } catch (error) {
    return error;
  }
};
