import toast from "react-hot-toast";
import AddressCard from "../../components/User/AddressCard";
import { AddressData, EditAddressData } from "../../data";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
  updateAddress,
} from "../../app/feature/Address/AddressSlice";
import { useAppDispatch, type RootState } from "../../app/store";
import { useSelector } from "react-redux";
import ModalDialog from "../../components/utils/ModalDialog";

export interface IAddress {
  addressName: string;
  addressDetails: string;
  addressPhone: string;
}

export interface IEditAddress {
  editAddressName: string;
  editAddressDetails: string;
  editAddressPhone: string;
}

const AddressPage = () => {
  const [address, setAddress] = useState<IAddress>({
    addressDetails: "",
    addressName: "",
    addressPhone: "",
  });
  const [editAddress, setEditAddress] = useState<IEditAddress>({
    editAddressDetails: "",
    editAddressName: "",
    editAddressPhone: "",
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [addressClicked, setAddressClicked] = useState("");
  const { allAddress } = useSelector((state: RootState) => state.address);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllAddresses());
  }, [dispatch]);

  // Handlers..✅✅✅
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handelEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAddress({ ...editAddress, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      address.addressDetails.length === 0 ||
      address.addressName.length === 0 ||
      address.addressPhone.length === 0
    ) {
      toast.error("Complete all fields", {
        position: "top-right",
      });
      return;
    } else {
      const data = {
        alias: address.addressName,
        details: address.addressDetails,
        phone: address.addressPhone,
      };

      dispatch(addAddress(data));
      setAddress({
        addressDetails: "",
        addressName: "",
        addressPhone: "",
      });
    }
  };

  const handleDelete = () => {
    dispatch(deleteAddress(addressClicked));
    setOpenDeleteModal(false);
  };

  const handelUpdateAddress = () => {
    if (
      editAddress.editAddressDetails.length === 0 ||
      editAddress.editAddressName.length === 0 ||
      editAddress.editAddressPhone.length === 0
    ) {
      toast.error("Complete all fields", {
        position: "top-right",
      });
      return;
    } else {
      const data = {
        alias: editAddress.editAddressName,
        details: editAddress.editAddressDetails,
        phone: editAddress.editAddressPhone,
        id: addressClicked,
      };
      dispatch(updateAddress(data));
      setEditAddress({
        editAddressDetails: "",
        editAddressName: "",
        editAddressPhone: "",
      });
      setOpenEditModal(false);
    }
  };

  // Renders..🔃🔃🔃🔃
  const renderAddressInputs = AddressData.map((ele) => (
    <div key={ele.id}>
      <label
        htmlFor={ele.id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {ele.label}
      </label>
      <input
        type={ele.type}
        id={ele.id}
        name={ele.name}
        value={address[ele.name]}
        onChange={onChangeHandler}
        placeholder="Ex:(Home-Jop)"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  ));

  const renderEditAddressInputs = EditAddressData.map((ele) => (
    <div key={ele.id}>
      <label
        htmlFor={ele.id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {ele.label}
      </label>
      <input
        value={editAddress[ele.name]}
        onChange={handelEditChange}
        type={ele.type}
        id={ele.id}
        name={ele.name}
        placeholder="Ex:(Home-Jop)"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  ));

  return (
    <>
      <form className="space-y-2" onSubmit={onSubmit}>
        {renderAddressInputs}
        <button
          type="submit"
          className=" rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Address
        </button>
      </form>
      <div className="space-y-2">
        {allAddress &&
          allAddress
            .slice()
            .reverse()
            .map((ele, idx) => (
              <AddressCard
                setEditAddress={setEditAddress}
                setAddressClicked={setAddressClicked}
                openDeleteModal={setOpenDeleteModal}
                setOpenEditModal={setOpenEditModal}
                address={ele}
                key={idx}
              />
            ))}
      </div>

      {/* Delete Modal */}
      <ModalDialog
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        description="Are you sure you want to delete address? The address will be permanently removed. This action cannot be undone."
        title="Delete Address"
      >
        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-white">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </button>
          <button
            type="button"
            data-autofocus
            onClick={() => {
              setOpenDeleteModal(false);
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </ModalDialog>

      {/* Edit Modal */}
      <ModalDialog
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Edit Address"
      >
        <div className="space-y-2 p-3 dark:bg-gray-800 dark:text-white">
          {renderEditAddressInputs}
        </div>
        <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-800 dark:text-white">
          <button
            onClick={handelUpdateAddress}
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          >
            Edit
          </button>
          <button
            type="button"
            data-autofocus
            onClick={() => {
              setOpenEditModal(false);
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

export default AddressPage;
