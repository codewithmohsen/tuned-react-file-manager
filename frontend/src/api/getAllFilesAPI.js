import { api } from './api';

export const getAllFilesAPI = async () => {
  try {
    const response = await api.get();
    console.log(api, response);
    return response;
  } catch (error) {
    console.log(api, error);
    return error;
  }
};
