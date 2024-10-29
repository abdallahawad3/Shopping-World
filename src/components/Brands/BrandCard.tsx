import type { IBrand } from "../../interfaces";
interface IProps {
  brand: IBrand;
}
const BrandCard = ({ brand }: IProps) => {
  const img = brand.image.indexOf("https");

  return (
    <div className="cursor-pointer rounded border p-2 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="mb-2 flex items-center justify-center ">
        <img
          src={img !== -1 ? brand.image.slice(img) : brand.image}
          className="size-48 rounded-sm   "
          alt="Laptop Image"
        />
      </div>
      <p className="text-center font-semibold dark:text-white">{brand.name}</p>
    </div>
  );
};

export default BrandCard;
