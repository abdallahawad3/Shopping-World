import toast from "react-hot-toast";
import type { IProduct } from "../interfaces";

export const textSlice = (txt: string, length: number) => {
  if (txt.length > length) {
    return `${txt.slice(0, length)}...`;
  } else return txt;
};

export const addItemToShoppingCart = (
  allProducts: IProduct[],
  product: IProduct,
) => {
  const isExist = allProducts.find((item) => item._id === product._id);
  if (isExist) {
    toast.success(`This already exist in you cart, increase quantity`, {
      duration: 2000,
      position: "top-right",
    });
    return allProducts.map((item) =>
      item._id === product._id ? { ...item, qu: item.qu + 1 } : item,
    );
  }
  toast.success("Added To Cart", {
    duration: 2000,
    position: "top-right",
  });
  return [...allProducts, { ...product, qu: 1 }];
};
