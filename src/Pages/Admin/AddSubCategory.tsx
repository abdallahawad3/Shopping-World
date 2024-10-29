import { useEffect, useState, type FormEvent } from "react";
import SelectMenu from "../../components/utils/SelectMenu";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { getAllCategory } from "../../app/feature/CategorySlice/CategorySlice";
import toast from "react-hot-toast";
import { addSubCategory } from "../../app/feature/subCategorySlice/subCategorySlice";

const AddSubCategoryPage = () => {
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const { data } = useSelector((state: RootState) => state.allCategory);
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState({
    _id: "",
    slug: "",
    image: "",
    name: "",
  });

  useEffect(() => {
    dispatch(getAllCategory(60));
    setSelected(selected);
  }, [dispatch, selected]);

  // Submit Handlers
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const x = Object.values(selected);
    const isEmpty = x.find((ele) => ele.length > 0);

    if (isEmpty == undefined || subCategoryName.length == 0) {
      if (isEmpty == undefined && subCategoryName.length == 0) {
        toast.error("The subcategory name and main category are required.!", {
          position: "top-right",
        });
      } else if (isEmpty == undefined) {
        toast.error("The main category is required.!", {
          position: "top-right",
        });
      } else {
        toast.error("The subcategory name is required.!", {
          position: "top-right",
        });
      }
    }

    if (isEmpty !== undefined && subCategoryName.length != 0) {
      const data = {
        name: "",
        category: "",
      };
      data.name = subCategoryName;
      data.category = selected._id;

      dispatch(addSubCategory(data));
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Add Sub Category
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
            type="text"
            value={subCategoryName}
            onChange={(e) => {
              setSubCategoryName(e.target.value);
            }}
          />
        </div>
        {selected && (
          <SelectMenu
            category={data}
            selected={selected && selected}
            setSelected={setSelected}
            selectFor="Main Category"
          />
        )}

        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubCategoryPage;
