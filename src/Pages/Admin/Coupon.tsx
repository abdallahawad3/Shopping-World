// import { Datepicker } from "flowbite-react";
import toast from "react-hot-toast";
import CouponCard from "../../components/Admin/CouponCard";
import { useEffect, useState, type FormEvent } from "react";
import { useAppDispatch, type RootState } from "../../app/store";
import {
  addNewCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../../app/feature/Coupon/CouponSlice";
import { useSelector } from "react-redux";
import ModalDialog from "../../components/utils/ModalDialog";

export interface IEdit {
  couponDate: Date | null;
  couponName: string;
  couponDiscount: string;
}

const DiscountCoupon = () => {
  const [couponDate, setCouponDate] = useState<Date | null>(null);
  const [couponName, setCouponName] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponClicked, setCouponClicked] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState<IEdit>({
    couponDate: null,
    couponDiscount: "",
    couponName: "",
  });
  const dispatch = useAppDispatch();
  const { allCoupon } = useSelector((state: RootState) => state.coupon);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponDate(new Date(e.target.value));
  };

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
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
      setCouponDate(null);
      setCouponName("");
      setCouponDiscount("");
    }
  };

  const onSubmitEditHandle = () => {
    if (
      editCoupon.couponName.length == 0 ||
      editCoupon.couponDiscount.length == 0 ||
      editCoupon.couponDate == null
    ) {
      toast.error("Please compleat all fields", {
        position: "top-right",
      });
    } else {
      const data = {
        name: editCoupon.couponName,
        expire: editCoupon.couponDate!.toLocaleDateString("en-US"),
        discount: editCoupon.couponDiscount,
        id: couponClicked,
      };
      dispatch(updateCoupon(data));
      setEditCoupon({
        couponDate: null,
        couponDiscount: "",
        couponName: "",
      });
      setCouponClicked("");
      setOpenEditModal(false);
    }
  };

  return (
    <>
      <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
        <form onSubmit={onSubmitHandle} className="mb-5 space-y-2">
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
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Coupon
          </button>
        </form>
        <div className="space-y-2">
          {allCoupon &&
            allCoupon.map((ele) => (
              <CouponCard
                setEditCoupon={setEditCoupon}
                setCouponClicked={setCouponClicked}
                setOpen={setOpenDeleteModal}
                setEditOpen={setOpenEditModal}
                coupon={ele}
                key={ele._id}
              />
            ))}
        </div>
      </div>

      {/* Delete Modal */}
      <ModalDialog
        description="Are you sure you want to delete coupon? The coupon will be permanently removed. This action cannot be undone."
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Delete Coupon"
      >
        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-white">
          <button
            type="button"
            onClick={() => {
              dispatch(deleteCoupon(couponClicked));
              setOpenDeleteModal(false);
              setCouponClicked("");
            }}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </button>
          <button
            type="button"
            data-autofocus
            onClick={() => {
              setOpenDeleteModal(false);
              setCouponClicked("");
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </ModalDialog>
      {/* EDIT Modal */}
      <ModalDialog
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Edit Coupon"
      >
        <div className="space-y-2 p-3 dark:bg-gray-800 dark:text-white">
          <div>
            <label
              htmlFor="couponName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Coupon Name
            </label>
            <input
              value={editCoupon.couponName}
              onChange={(e) => {
                setEditCoupon({
                  ...editCoupon,
                  couponName: e.target.value,
                });
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
              value={
                editCoupon.couponDate
                  ? editCoupon.couponDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                setEditCoupon({
                  ...editCoupon,
                  couponDate: new Date(e.target.value),
                });
              }}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Discount percentage
            </label>
            <input
              value={editCoupon.couponDiscount}
              onChange={(e) => {
                setEditCoupon({
                  ...editCoupon,
                  couponDiscount: e.target.value,
                });
              }}
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-white">
          <button
            type="submit"
            onClick={() => {
              onSubmitEditHandle();
            }}
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          >
            Edit
          </button>
          <button
            type="button"
            data-autofocus
            onClick={() => {
              setOpenEditModal(false);
              setCouponClicked("");
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </ModalDialog>
    </>
  );
};

export default DiscountCoupon;
