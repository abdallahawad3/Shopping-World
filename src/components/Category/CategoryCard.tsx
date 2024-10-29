// import { laptop } from "../../assets/images/index";
import type { ICategory } from "../../interfaces";

interface IProps {
  category: ICategory;
}

const CategoryCard = ({ category }: IProps) => {
  const img = category.image.indexOf("https");

  return (
    <div className="cursor-pointer rounded border p-2 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="mb-2 flex items-center justify-center ">
        <img
          src={img == 33 ? category.image.slice(img) : category.image}
          className="size-48 rounded-sm   "
          alt="Laptop Image"
        />
      </div>
      <p className="text-center font-semibold dark:text-white">
        {category.name}
      </p>
    </div>
  );
};

export default CategoryCard;
