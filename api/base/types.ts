export interface Error {
  title: string;
  description: string;
}

export interface AxiosBaseQueryError {
  status?: number;
  data?: string | Error;
}
