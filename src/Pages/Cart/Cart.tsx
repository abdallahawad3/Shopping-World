import CartComponent from "../../components/Cart/CartComponent";
import CartSidebar from "./CartSidebar";

const CartPage = () => {
  return (
    <>
      <h2 className="container mt-[-5px] bg-blue-600  py-5 text-center text-xl font-semibold  text-white sm:text-2xl">
        Shopping Cart
      </h2>
      <div className="container my-10 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div className="space-y-6">
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
          </div>
        </div>
        <CartSidebar />
      </div>
    </>
  );
};

export default CartPage;
