import { useSelector } from "react-redux";
import CartComponent from "../../components/Cart/CartComponent";
import CartSidebar from "./CartSidebar";
import type { RootState } from "../../app/store";

const CartPage = () => {
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <h2 className="container mt-[-50px]  text-center text-xl font-semibold  text-white sm:text-2xl">
        Shopping Cart
      </h2>
      <div className="justify-evenly lg:flex lg:items-start xl:gap-8">
        <div className=" w-full lg:max-w-xl xl:max-w-3xl">
          <div className="space-y-6">
            {cartProducts ? (
              cartProducts.map((ele) => (
                <CartComponent product={ele} key={ele._id} />
              ))
            ) : (
              <h1>No Products</h1>
            )}
          </div>
        </div>
        <CartSidebar />
      </div>
    </>
  );
};

export default CartPage;
