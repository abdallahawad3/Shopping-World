// import { Datepicker } from "flowbite-react";
import toast from "react-hot-toast";
import CouponCard from "../../components/Admin/CouponCard";
import { useEffect, useState } from "react";
import { useAppDispatch, type RootState } from "../../app/store";
import {
  addNewCoupon,
  getAllCoupons,
} from "../../app/feature/Coupon/CouponSlice";
import { useSelector } from "react-redux";

const DiscountCoupon = () => {
  const [couponDate, setCouponDate] = useState<Date | null>(null);
  const [couponName, setCouponName] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const dispatch = useAppDispatch();
  const { allCoupon } = useSelector((state: RootState) => state.coupon);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponDate(new Date(e.target.value));
  };

  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            couponName.length == 0 ||
            couponDiscount.length == 0 ||
            couponDate == null
          ) {
            toast.error("Please compleat all fields", {
              position: "top-right",
            });
          } else {
            const data = {
              name: couponName,
              expire: couponDate.toLocaleDateString("en-US"),
              discount: couponDiscount,
            };
            dispatch(addNewCoupon(data));
          }
        }}
        className="mb-5 space-y-2"
      >
        <div>
          <label
            htmlFor="couponName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Coupon Name
          </label>
          <input
            value={couponName}
            onChange={(e) => {
              setCouponName(e.target.value);
            }}
            id="couponName"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Expire Date
          </label>
          <input
            type="date"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white  dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={couponDate ? couponDate.toISOString().split("T")[0] : ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Discount percentage
          </label>
          <input
            value={couponDiscount}
            onChange={(e) => {
              setCouponDiscount(e.target.value);
            }}
            type="number"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            console.log(couponDate);
          }}
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Coupon
        </button>
      </form>
      <div className="space-y-2">
        {allCoupon &&
          allCoupon.map((ele) => <CouponCard coupon={ele} key={ele._id} />)}
      </div>
    </div>
  );
};

export default DiscountCoupon;
