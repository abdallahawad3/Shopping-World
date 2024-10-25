const UserDetails = () => {
  return (
    <div className="m-[30px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:m-0 md:p-6 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        User Information
      </h2>
      <p className="">
        <span className="text-lg font-semibold dark:text-blue-600">Name: </span>{" "}
        {""}
        Abdullah
      </p>
      <p className="">
        <span className="text-lg font-semibold dark:text-blue-600">Phone:</span>
        01016922613
      </p>
      <p className="">
        <span className="text-lg font-semibold dark:text-blue-600">
          Email:{" "}
        </span>{" "}
        Abdullahawad@gmail.com
      </p>
    </div>
  );
};

export default UserDetails;
