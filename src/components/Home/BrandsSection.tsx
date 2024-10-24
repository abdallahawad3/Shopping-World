import BrandCard from "../Brands/BrandCard";
import SubTitle from "../utils/SubTitle";
interface IProps {
  title: string;
  btnTitle: string;
}
const BrandsSection = ({ btnTitle, title }: IProps) => {
  return (
    <div>
      <SubTitle redirectPath="/" title={title} btnTitle={btnTitle} />
      <div className="mt-5 grid justify-center gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
        <BrandCard />
      </div>
    </div>
  );
};

export default BrandsSection;
