export interface IProduct {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount: number;
  availableColors: string[];
  imageCover: string;
  images: string[];
  category: string;
  subcategory: string[];
  ratingsQuantity: number;
  qu: number;
  count: number;
}

export interface IDataResponse {
  data: IProduct[];
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    nextPage: number;
  };
  results: number;
}

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

export interface IAddProduct {
  description: string;
  title: string;
  quantity: number;
  price: number;
  subcategory: string;
}

export interface IAddProductInputs {
  id: "description" | "title" | "quantity" | "price" | "subcategory";
  label: string;
  name: "description" | "title" | "quantity" | "price" | "subcategory";
  type: string;
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

export interface IRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface CookieOptions {
  maxAge?: number;
  signed?: boolean;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
}
