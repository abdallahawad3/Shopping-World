import type { IAddProductInputs } from "../interfaces";

export const AddProductInputs: IAddProductInputs[] = [
  {
    id: "title",
    name: "title",
    label: "Product Title",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    label: "Product description",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "Product price",
    type: "number",
  },

  {
    id: "quantity",
    name: "quantity",
    label: "Product Quantity",
    type: "number",
  },
];
