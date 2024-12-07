import { MdDelete, MdEdit } from "react-icons/md";
import type { IEditAddress } from "../../Pages/User/Address";
interface IProps {
  address: { _id: string; alias: string; details: string; phone: string };
  openDeleteModal: (val: boolean) => void;
  setOpenEditModal: (val: boolean) => void;
  setAddressClicked: (val: string) => void;
  setEditAddress: (val: IEditAddress) => void;
}
const AddressCard = ({
  address,
  setOpenEditModal,
  setEditAddress,
  openDeleteModal,
  setAddressClicked,
}: IProps) => {
  return (
    <>
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow  md:max-w-full md:flex-row dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5 flex flex-wrap items-center justify-between">
          <h5 className="text-lg font-bold ">{address.alias}</h5>
          <div className="space-x-1">
            <button
              type="button"
              onClick={() => {
                setAddressClicked(address._id);
                openDeleteModal(true);
              }}
              className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              <MdDelete />
            </button>
            <button
              type="button"
              onClick={() => {
                setAddressClicked(address._id);
                setEditAddress({
                  editAddressDetails: address.details,
                  editAddressName: address.alias,
                  editAddressPhone: address.phone,
                });
                setOpenEditModal(true);
              }}
              className=" rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <MdEdit />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <p>{address.details}</p>
          <p>
            <span>Phone Number: </span>
            {address.phone}
          </p>
        </div>
      </section>
    </>
  );
};

export default AddressCard;
