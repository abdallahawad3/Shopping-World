import RatingStars from "../utils/RatingStars";

const ProductReviewCar = () => {
  return (
    <div className="space-y-2 border-b py-5 ">
      <div className="flex gap-2">
        <h2>Abdullah Awad </h2>
        <div className="flex items-center">
          <RatingStars maxStars={1} rating={1} size={20} />
          <span className="text-[#ffd700]">4.3</span>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
        accusantium repellendus sapiente id dignissimos enim beatae eius rerum
        distinctio quae?
      </p>
    </div>
  );
};

export default ProductReviewCar;
