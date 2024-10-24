import ProductCard from "../utils/ProductCard";
import SubTitle from "../utils/SubTitle";

interface IProps {
  title: string;
  btnTitle: string;
}

const CardProductsSection = ({ btnTitle, title }: IProps) => {
  return (
    <div>
      <SubTitle redirectPath="/" title={title} btnTitle={btnTitle} />
      <div className="mt-6 grid  gap-3 md:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default CardProductsSection;
