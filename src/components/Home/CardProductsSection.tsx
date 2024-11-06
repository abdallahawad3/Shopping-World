import type { IProduct } from "../../interfaces";
import ProductCard from "../utils/ProductCard";
import SubTitle from "../utils/SubTitle";
interface IProps {
  title: string;
  btnTitle?: string;
  products: IProduct[];
  isLoading: boolean;
}

const CardProductsSection = ({
  products,
  isLoading,
  btnTitle,
  title,
}: IProps) => {
  if (isLoading) return <h1>LOADING DATA...👋</h1>;
  return (
    <div>
      <SubTitle redirectPath="/products" title={title} btnTitle={btnTitle} />
      <div className="mt-5 grid  gap-4 px-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products &&
          products
            .slice(-4)
            .map((ele) => <ProductCard product={ele} key={ele._id} />)}
      </div>
    </div>
  );
};

export default CardProductsSection;
