import OrderCard from "../../components/Admin/OrderCard";
// import UserDetails from "../../components/Admin/UserDetails";

const OrdersPage = () => {
  return (
    <div className="mx-auto mt-10 max-w-screen-xl space-y-5 px-4 py-10 md:ms-[16rem] lg:px-12">
      <h2 className="mb-5 flex justify-between text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Orders Details
        <span>Total: 20</span>
      </h2>
      <div className="space-y-5">
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
};

export default OrdersPage;
