const AddCategoryPage = () => {
  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Add New Category
      </h2>
      <form className="space-y-5">
        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload Category Image
          </label>
          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
            id="file_input"
            type="file"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Category Name
          </label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Category Name"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
