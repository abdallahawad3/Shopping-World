import type {
  IAddProductInputs,
  IAddressInputs,
  IEditAddressInputs,
} from "../interfaces";

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

export const AddressData: IAddressInputs[] = [
  {
    name: "addressName",
    type: "text",
    id: "addressName",
    placeholder: "Ex:(Home-Jop)",
    label: "Address Name",
  },
  {
    name: "addressDetails",
    label: "Address Details",
    type: "text",
    id: "addressDetails",
    placeholder: "State-province-city",
  },
  {
    name: "addressPhone",
    label: "Address Phone",
    type: "number",
    id: "addressPhone",
    placeholder: "+20101010",
  },
];
export const EditAddressData: IEditAddressInputs[] = [
  {
    name: "editAddressName",
    type: "text",
    id: "addressName",
    placeholder: "Ex:(Home-Jop)",
    label: "Address Name",
  },
  {
    name: "editAddressDetails",
    label: "Address Details",
    type: "text",
    id: "addressDetails",
    placeholder: "State-province-city",
  },
  {
    name: "editAddressPhone",
    label: "Address Phone",
    type: "number",
    id: "addressPhone",
    placeholder: "+20101010",
  },
];
