export interface ICategory {
  id: string;
  image: string;
  name: string;
  slug: string;
}
export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}
