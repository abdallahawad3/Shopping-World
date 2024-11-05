import UserOrdersCard from "../../components/User/UserOrdersCard";
// import Pagination from "../../components/utils/Pagination";

const UserHomePage = () => {
  return (
    <section>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <UserOrdersCard />
        <UserOrdersCard />
        <UserOrdersCard />
        <UserOrdersCard />
        <UserOrdersCard />
        <UserOrdersCard />
        <UserOrdersCard />
      </div>
      <div className="mt-5 text-center">{/* <Pagination /> */}</div>
    </section>
  );
};

export default UserHomePage;
