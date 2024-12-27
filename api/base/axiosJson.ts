import { createCustomAxiosInstance } from "./axios";

export const axiosJson = createCustomAxiosInstance({
  'Content-Type': 'application/json',
});
