import ProductCard from "../utils/ProductCard";
import SubTitle from "../utils/SubTitle";

interface IProps {
  title: string;
  btnTitle?: string;
}

const CardProductsSection = ({ btnTitle, title }: IProps) => {
  return (
    <div>
      <SubTitle redirectPath="/products" title={title} btnTitle={btnTitle} />
      <div className="mt-5 grid  gap-4 px-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default CardProductsSection;
