import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import BrandCard from "../Brands/BrandCard";
import SubTitle from "../utils/SubTitle";
import { useEffect } from "react";
import { getAllBrand } from "../../app/feature/Brands/brandSlice";
interface IProps {
  title: string;
  btnTitle: string;
}
const BrandsSection = ({ btnTitle, title }: IProps) => {
  const { data } = useSelector((state: RootState) => state.allBrand);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllBrand(5));
  }, [dispatch]);

  return (
    <div>
      <SubTitle redirectPath="/brands" title={title} btnTitle={btnTitle} />
      <div className="mt-5 grid justify-center gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((ele) => (
          <BrandCard brand={ele} key={ele._id} />
        ))}
      </div>
    </div>
  );
};

export default BrandsSection;
