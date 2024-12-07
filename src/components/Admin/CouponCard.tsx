import type { ICoupon } from "../../interfaces";
import type { IEdit } from "../../Pages/Admin/Coupon";

interface IProps {
  setOpen: (val: boolean) => void;
  setEditOpen: (val: boolean) => void;
  coupon: ICoupon;
  setCouponClicked: (val: string) => void;
  setEditCoupon: ({ couponDate, couponDiscount, couponName }: IEdit) => void;
}

const CouponCard = ({
  coupon,
  setOpen,
  setCouponClicked,
  setEditOpen,
  setEditCoupon,
}: IProps) => {
  return (
    <div className="rounded-lg border-2 border-gray-300  bg-gray-50 p-3  dark:border-gray-600 dark:bg-gray-800 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-lg font-bold text-green-500 dark:text-green-400">
            Coupon Name:
          </p>
          <span className="font-semibold text-blue-700">{coupon.name}</span>
        </div>
        {/* actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setEditOpen(true);
              setCouponClicked(coupon._id);
              setEditCoupon({
                couponDate: new Date(coupon.expire),
                couponDiscount: `${coupon.discount}`,
                couponName: coupon.name,
              });
            }}
            className="flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none  focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none  focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            type="button"
            onClick={() => {
              setCouponClicked(coupon._id);
              setOpen(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <p className="font-semibold">
          End Date:
          <span className="text-red-500"> {coupon.expire.slice(0, 10)}</span>
        </p>
        <p className="font-semibold">
          Discount percentage:
          <span className="text-green-600"> {coupon.discount}%</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default CouponCard;
