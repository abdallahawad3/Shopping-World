import { laptop } from "../../assets/images/index";

const CategoryCard = () => {
  return (
    <div className="size-40 rounded-full bg-gray-300 text-center ">
      <img src={laptop} className="rounded-full p-5" alt="Laptop Image" />
      <p className="text-center font-semibold dark:text-white">Category one</p>
    </div>
  );
};

export default CategoryCard;
