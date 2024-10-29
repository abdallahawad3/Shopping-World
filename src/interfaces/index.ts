export interface ICategory {
  _id: string;
  image: string;
  name: string;
  slug: string;
}
export interface IBrand {
  _id: string;
  image: string;
  name: string;
  slug: string;
}

export interface ISubCategory {
  _id: string;
  name: string;
  category: string;
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
